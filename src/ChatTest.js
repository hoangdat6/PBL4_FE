import React, { useState, useEffect } from 'react';
import useGameWebSocket from "./hooks/useGameWebSocket";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const ChatTest = () => {
    const userId = Cookies.get('userId');
    const { connect, sendMove, stompClient, isConnected } = useGameWebSocket();
    const [roomCode] = useState('test-room'); // Giả lập roomCode
    const [message, setMessage] = useState('');
    const [recipientId, setRecipientId] = useState(''); // New state for recipient ID
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        if (roomCode && userId) {
            connect(roomCode, userId);
        }
    }, [roomCode, userId]);

    const sendMessage = () => {
        if (!message || !recipientId) return;
        console.log('Sending message:', message);
        const chatMessage = { senderId: userId, recipientId, content: message };
        sendMove(`/app/message/${roomCode}`, chatMessage); // Gửi tin nhắn đến topic chat
        setMessage('');
        setRecipientId(''); // Clear recipient ID after sending
    };

    // Giả lập nhận tin nhắn từ WebSocket
    useEffect(() => {
        if(!isConnected) return;
        const receiveMessage = (msg) => {
            setChatLog((prev) => [...prev, msg]);
        };

        console.log(`Subscribing to chat messages : /user/queue/messages`);
        // Lắng nghe WebSocket event (thay thế bằng cách subscribe topic nếu có)
        const chatSubscription = stompClient.current.subscribe(`/user/queue/messages`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log(message.body);
            receiveMessage(receivedMessage);
        });

        return () => {
            chatSubscription?.unsubscribe();
        };
    }, [isConnected]);

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                <ul>
                    {chatLog.map((msg, index) => (
                        <li key={index}>
                            {msg.senderId}: {msg.content}
                        </li>
                    ))}
                </ul>
            </div>
            <input
                type="text"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                placeholder="Recipient ID"
            />
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatTest;