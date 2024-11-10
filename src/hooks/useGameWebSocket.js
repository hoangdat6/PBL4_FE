import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import CaroGame from '../models/CaroGame';
import { useDispatch } from "react-redux";
import { addMove, setGameState } from "../store/slices/RoomSlice";
import { GAME_PROGRESS_TOPIC, GAME_STATE_TOPIC, GAME_END_TOPIC, PLAY_AGAIN_TOPIC } from '../constants/socketEndpoint';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const useGameWebSocket = () => {
    const stompClient = useRef(null);
    const dispatch = useDispatch();
    const [moves, setMoves] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [winner, setWinner] = useState(null);
    const [playAgain, setPlayAgain] = useState(false);


    const connect = (roomCode, playerId) => {
        if (!roomCode || !playerId) return;

        const socket = new SockJS(SOCKET_URL);
        const client = new Client({
            connectHeaders: {
                'playerId': playerId,
            },
            webSocketFactory: () => socket,
            onConnect: () => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);

                client.subscribe(GAME_PROGRESS_TOPIC(roomCode), (message) => {
                    const move = JSON.parse(message.body);
                    setMoves((prevMoves) => [...prevMoves, move]);
                    dispatch(addMove(move));
                });

                client.subscribe(GAME_STATE_TOPIC(roomCode), (gameStartDTO) => {
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

                client.subscribe(GAME_END_TOPIC(roomCode), (message) => {
                    const winner = JSON.parse(message.body);
                    setWinner(winner.body);
                });

                client.subscribe(PLAY_AGAIN_TOPIC(roomCode), (message) => {
                    const playAgain = JSON.parse(message.body);
                    setPlayAgain(playAgain.body);
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
            stompClient.current.send({ destination: destination }, {}, JSON.stringify(msg));
        }
    };

    const sendPlayAgain = (destination, msg) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({ destination: destination , body: JSON.stringify(msg)});
        }
    }

    useEffect(() => {
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    return { moves, isGameStarted, sendMove, isConnected, loading, connect, stompClient, winner, sendPlayAgain, playAgain };
};

export default useGameWebSocket;