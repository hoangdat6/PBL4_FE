import React from 'react';
import '../styles/ChatMessage.css';

const ChatMessage = ({ username, score }) => {
    return (
        <div className="chat-message">
            <strong>{username}:</strong> <span>{score}</span>
        </div>
    );
};

export default ChatMessage;
