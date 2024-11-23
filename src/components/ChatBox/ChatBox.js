// ChatBox.jsx
import React, { useState } from "react";
import styles from "./ChatBox.module.scss";

const ChatBox = () => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log("Message sent:", message); // Thay bằng logic WebSocket
            setMessage(""); // Reset input
        }
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.chatArea}>
                {/* Hiển thị các tin nhắn trong chat */}
                <div className={styles.emptyState}>
                    <i className={styles.icon}></i>
                </div>
            </div>
            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                    <i className={styles.sendIcon}></i>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
