import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBubble.module.scss";

const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Chào bạn! Tôi có thể giúp gì?", sender: "bot" },
    ]);
    const [inputValue, setInputValue] = useState("");

    const chatContentRef = useRef(null);

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text: inputValue, sender: "user" },
            ]);

            setInputValue("");

            // Giả lập phản hồi từ bot
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now(), text: "Cảm ơn bạn đã gửi tin nhắn!", sender: "bot" },
                ]);
            }, 1000);
        }
    };

    useEffect(() => {
        // Cuộn xuống cuối cùng khi có tin nhắn mới
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.chatBubbleContainer}>
            {/* Toggle Chat Button */}
            <div
                className={`${styles.toggleButton} ${isOpen ? styles.open : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                💬
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <span>Hỗ trợ trực tuyến</span>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className={styles.chatContent} ref={chatContentRef}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.bot}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatInput}>
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBubble;
