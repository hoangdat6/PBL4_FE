import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ScoreInput from './ScoreInput';
import useWebSocket from '../hooks/useWebSocket';
import '../styles/GameRoom.css';

const GameRoom = () => {
    const [messages, setMessages] = useState([]);
    const { sendMessage, lastMessage } = useWebSocket('http://localhost:8080/ws');

    useEffect(() => {
        if (lastMessage) {
            setMessages((prevMessages) => [...prevMessages, lastMessage]);
        }
    }, [lastMessage]);

    const handleSendScore = (username, score) => {
        const message = { username, score };
        sendMessage('/app/score', message);
    };

    return (
        <div className="game-room">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} username={msg.username} score={msg.score} />
                ))}
            </div>
            <ScoreInput onSendScore={handleSendScore} />
        </div>
    );
};

export default GameRoom;