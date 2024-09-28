import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (url, roomId, topic = '/topic/room') => {
    const [lastMessage, setLastMessage] = useState([]);
    const [client, setClient] = useState(null);

    useEffect(() => {
        // Tạo kết nối với SockJS và STOMP
        const socket = new SockJS(url);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            // debug: (str) => console.log(str),  // Log các sự kiện cho mục đích debug
            onConnect: () => {
                console.log('Connected to WebSocket');

                // Subscribe vào topic cụ thể
                stompClient.subscribe(topic, (message) => {
                    if (message.body) {
                        const move = JSON.parse(message.body);
                        setLastMessage((prevState) => [...prevState, move]); // Lưu danh sách nước đi
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onWebSocketClose: () => {
                console.log('Disconnected from WebSocket');
            }
        });

        // Xử lý các tin nhắn không được xử lý trong các subscribe
        stompClient.onUnhandledMessage = (message) => {
            const parsedMessage = JSON.parse(message.body);
            console.log('Unhandled message: ', parsedMessage);
            setLastMessage((prevState) => [...prevState, parsedMessage]); // Lưu danh sách tin nhắn không xác định
        };

        stompClient.activate();  // Kích hoạt kết nối WebSocket
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();  // Hủy kết nối khi component bị unmount
            }
        };
    }, [url, topic]);

    // Hàm gửi tin nhắn đến server
    const sendMessage = (destination, message) => {
        if (client && client.connected) {
            client.publish({
                destination,  // Destination (ví dụ: /app/move)
                body: JSON.stringify(message),  // Nội dung tin nhắn
            });
        }
    };

    return { sendMessage, lastMessage };
};

export default useWebSocket;
