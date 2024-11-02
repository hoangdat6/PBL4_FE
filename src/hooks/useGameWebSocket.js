import { useEffect, useState, useCallback, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import CaroGame from '../models/CaroGame';
import {useDispatch, useSelector} from "react-redux";
import { addMove, setGameState } from "../store/slices/caroGameSlice";

const useGameWebSocket = () => {
    const stompClient = useRef(null);
    const dispatch = useDispatch();
    const [moves, setMoves] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    const connect = (roomCode, playerId) => {
        if (!roomCode || !playerId) return; // Đảm bảo có roomCode và playerId trước khi kết nối

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
                        gameStart.boardState.winLength,
                    );
                    console.log("Game state: ", newCaroGame.getCurrentState());
                    dispatch(setGameState(newCaroGame.getCurrentState()));
                    setIsGameStarted(true);
                });

                setIsConnected(true);
                stompClient.current = client;
            },
            onStompError: (frame) => {
                setLoading(false);
            },
            onWebSocketClose: () => {
                setLoading(false);
            }
        });

        client.activate();
    };

    const sendMove = (destination, move) => {
        if (stompClient.current) {
            stompClient.current.publish({ destination: destination, body: JSON.stringify(move) });
        }
    };

    const sendMessage = (destination, msg) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.send({destination: destination}, {}, JSON.stringify(msg));
        }
    };

    useEffect(() => {
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    return { moves, isGameStarted, sendMove, isConnected, loading, connect, stompClient };
};

export default useGameWebSocket;
