import { useEffect, useState, useCallback, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import CaroGame from '../models/CaroGame';
import {useDispatch} from "react-redux";
import {addMove, setGameState} from "../store/slices/caroGameSlice"; // Import the CaroGame class

const useGameWebSocket = (roomCode, playerId) => {
    const stompClient = useRef(null);
    const dispatch = useDispatch();
    const [moves, setMoves] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    const connect = useCallback(() => {
        const socket = new SockJS(`http://localhost:8080/caro-game?roomCode=${roomCode}`);
        const client = new Client({
            connectHeaders: {
                'playerId': playerId,
            },
            webSocketFactory: () => socket,
            onConnect: () => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);

                client.subscribe(`/topic/game-progress/${roomCode}`, (message) => {
                    const move = JSON.parse(message.body);
                    setMoves((prevMoves) => [...prevMoves, move]);
                    dispatch(addMove(move));
                });

                client.subscribe(`/topic/game-state/${roomCode}`, (gameStartDTO) => {
                    const gameStart = JSON.parse(gameStartDTO.body);
                    const newCaroGame = new CaroGame(
                        gameStart.roomCode,
                        gameStart.startPlayerId,
                        gameStart.nthMove,
                        gameStart.boardState.board,
                        gameStart.boardState.size,
                        gameStart.boardState.winLength
                    );
                    console.log("Game state: ", newCaroGame.getCurrentState());
                    dispatch(setGameState(newCaroGame.getCurrentState()));
                    setIsGameStarted(true);
                });

                setIsConnected(true);
                stompClient.current = client;
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                setLoading(false);
            },
            onWebSocketClose: () => {
                console.log("WebSocket connection closed");
                setLoading(false);
            }
        });

        client.activate();
    }, [roomCode, playerId]);

    const sendMove = (destination, move) => {
        if (stompClient.current) {
            stompClient.current.publish({ destination: destination, body: JSON.stringify(move) });
        }
    };

    const sendMessage = (msg) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.send(`/app/message/${roomCode}`, {}, JSON.stringify(msg));
        }
    };

    const joinRoom = () => {
        if (stompClient.current) {
            stompClient.current.publish({ destination: `/app/join-room`, body: JSON.stringify({ roomCode }) });
        }
    };

    useEffect(() => {
        if (roomCode) {
            connect();
        }
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, [roomCode, connect]);

    return { moves, isGameStarted, sendMove, joinRoom, isConnected, loading, stompClient };
};

export default useGameWebSocket;