import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useDispatch, useSelector} from "react-redux";
import {
    addMove,
    setGameConfig,
    setGameState,
    setPlayerTimeInfo1,
    setPlayerTimeInfo2,
    setWinner,
} from "../store/slices/gameSlice";
import {
    GAME_PROGRESS_TOPIC,
    GAME_STATE_TOPIC,
    GAME_END_TOPIC,
    PLAY_AGAIN_TOPIC,
    GAME_START_TOPIC
} from '../constants/socketEndpoint';
import GameState from "../models/GameState";
import {setPlayer1Info, setPlayer2Info, setRoomState} from "../store/slices/roomSlice";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const useGameWebSocket = () => {
    const stompClient = useRef(null);
    const userId =  useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);
    const [playAgain, setPlayAgain] = useState({});
    const winnerId = useSelector((state) => state.game.winnerId);
    // const [isGameStarted, setIsGameStarted] = useState(false);

    const connect = (roomCode) => {
        if (!roomCode) return;

        const socket = new SockJS(SOCKET_URL, null, { withCredentials: true });
        const client = new Client({
            connectHeaders: {
                userId: userId.toString()
            },
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe(GAME_START_TOPIC(roomCode), (message) => {
                    const gameStart = JSON.parse(message.body);

                    console.log(gameStart);

                    const gameState = new GameState(
                        gameStart.roomCode,
                        gameStart.startPlayerId,
                        gameStart.nthMove,
                        gameStart.boardState.board,
                        gameStart.boardState.size,
                        gameStart.boardState.winLength,
                        gameStart.lastMove,
                        true,
                        gameStart.winnerId,
                        gameStart.player1Info,
                        gameStart.player2Info,
                        gameStart.gameConfig,
                    );

                    dispatch(setGameState(gameState.getCurrentState()));
                    dispatch(setRoomState(gameState.getCurrentState()));
                    dispatch(setGameConfig(gameState.getCurrentState().gameConfig)); // phai set gameConfig truoc
                    dispatch(setPlayer1Info(gameState.getCurrentState().player1Info))
                    dispatch(setPlayer2Info(gameState.getCurrentState().player2Info))
                    dispatch(setPlayerTimeInfo1(gameState.getCurrentState().player1Info.timeInfo));
                    dispatch(setPlayerTimeInfo2(gameState.getCurrentState().player2Info.timeInfo));
                });

                client.subscribe(GAME_PROGRESS_TOPIC(roomCode), (message) => {
                    const move = JSON.parse(message.body);
                    dispatch(addMove(move));
                });

                client.subscribe(GAME_STATE_TOPIC(roomCode), (gameStartDTO) => {
                    const gameStart = JSON.parse(gameStartDTO.body);

                    const gameState = new GameState(
                        gameStart.roomCode,
                        gameStart.startPlayerId,
                        gameStart.nthMove,
                        gameStart.boardState.board,
                        gameStart.boardState.size,
                        gameStart.boardState.winLength,
                        gameStart.lastMove,
                        true,
                        gameStart.winnerId,
                        gameStart.player1Info,
                        gameStart.player2Info,
                        gameStart.gameConfig,
                        gameStart.messages
                    );

                    dispatch(setGameState(gameState.getCurrentState()));
                    dispatch(setRoomState(gameState.getCurrentState()));
                    dispatch(setGameConfig(gameState.getCurrentState().gameConfig)); // phai set gameConfig truoc
                    dispatch(setPlayer1Info(gameState.getCurrentState().player1Info))
                    dispatch(setPlayer2Info(gameState.getCurrentState().player2Info))
                    dispatch(setPlayerTimeInfo1(gameState.getCurrentState().player1Info.timeInfo));
                    dispatch(setPlayerTimeInfo2(gameState.getCurrentState().player2Info.timeInfo));
                });

                client.subscribe(GAME_END_TOPIC(roomCode), (message) => {
                    const winner = JSON.parse(message.body);
                    dispatch(setWinner(winner.body));
                });

                client.subscribe(PLAY_AGAIN_TOPIC(roomCode), (message) => {
                    const playAgain = JSON.parse(message.body);
                    setPlayAgain(playAgain.body);
                });

                setIsConnected(true);
                // console.log('Connected to room: ' + roomCode);
                stompClient.current = client;
            },
            onStompError: (frame) => {
                // console.error('Broker reported error: ' + frame.headers['message']);
            },
            onWebSocketClose: () => {
                // console.log('Socket closed');
            }
        });

        client.activate();
    };

    const sendMove = (destination, move) => {
        if (stompClient.current) {
            stompClient.current.publish({ destination: destination, body: JSON.stringify(move) });
        }
    };

    const sendPlayAgain = (destination, msg) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({ destination: destination , body: JSON.stringify(msg)});
        }
    };

    const sendWinner = (destination, winnerId) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({ destination: destination , body: JSON.stringify(winnerId)});
        }
    };

    useEffect(() => {
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    return { sendMove, connect, sendPlayAgain, sendWinner, isConnected, stompClient, winnerId, playAgain,
        // isGameStarted
    };
};

export default useGameWebSocket;