import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (url) => {
    const [lastMessage, setLastMessage] = useState(null);
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('Connected');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message: ', message);
            setLastMessage(message);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        socket.onclose = () => {
            console.log('Disconnected');
        };

        setWebSocket(socket);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [url]);

    const sendMessage = (message) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(message));
        }
    };

    return { sendMessage, lastMessage };
};

export default useWebSocket;