import React, { useState } from 'react';
import '../styles/ScoreInput.css';

const ScoreInput = ({ onSendScore }) => {
    const [username, setUsername] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && score) {
            onSendScore(username, score);
            setScore(''); // Clear the score input after submission
        }
    };

    return (
        <form className="score-input" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ScoreInput;
