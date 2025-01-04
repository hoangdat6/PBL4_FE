import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.scss";
import { useSelector } from "react-redux";

const ChatBox = ({ stompClient, isConnected, roomCode }) => {
    const [message, setMessage] = useState("");
    const userId = useSelector(state => state.auth.userId);
    const messagesState = useSelector(state => state.room.messages);
    const [messages, setMessages] = useState(messagesState || []);
    const chatContentRef = useRef(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = { id: Date.now(), message: message, senderId: userId };

            setMessages(prevMessages => [...prevMessages, newMessage]);
            sendMessage(`/app/message/${roomCode}`, newMessage);
        }
        setMessage("");
    };

    const sendMessage = (destination, msg) => {
        if (!msg || !destination) return;
        stompClient.current.publish({ destination: destination, body: JSON.stringify(msg) });
    }

    useEffect(() => {
        if (!isConnected) return;

        const chatSubscription = stompClient.current.subscribe(`/user/queue/message/${roomCode}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        });

        return () => {
            chatSubscription?.unsubscribe();
        };
    }, [isConnected]);

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.chatBox}>
            <div className={styles.chatContent} ref={chatContentRef}>
                {messages && messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.message} ${msg.senderId === userId ? styles.user : styles.bot}`}
                    >
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.input}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                    <i className={styles.sendIcon}></i>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;