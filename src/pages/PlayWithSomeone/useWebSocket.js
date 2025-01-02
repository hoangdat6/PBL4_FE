import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useSelector} from "react-redux";
import {GAME_START_TOPIC_FRIEND} from "../../constants/socketEndpoint";
import {useNavigate} from "react-router-dom";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const useGameWebSocket = (setRoomCode) => {
    const stompClient = useRef(null);
    const userId =  useSelector((state) => state.auth.userId);
    const [isConnected, setIsConnected] = useState(false);

    const connect = () => {
        const socket = new SockJS(SOCKET_URL, null, { withCredentials: true });
        const client = new Client({
            connectHeaders: {
                userId: userId.toString()
            },
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe(GAME_START_TOPIC_FRIEND, (response) => {
                    console.log(response.body);
                    const roomCode = response.body;
                    console.log("roomCode: " + response.body);
                    setRoomCode(roomCode);

                });

                setIsConnected(true);
                stompClient.current = client;
            },
            onStompError: (frame) => {
            },
            onWebSocketClose: () => {
            }
        });

        client.activate();
    };

    useEffect(() => {
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    return {
        connect,
        isConnected,
        stompClient,
    };
};

export default useGameWebSocket;