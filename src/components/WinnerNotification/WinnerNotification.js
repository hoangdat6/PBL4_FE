import React from 'react';
import styles from './WinnerNotification.module.scss';
import ParticipantType from "../../enums/participantType";

const WinnerNotification = ({ winner, playerId, participantType }) => {
    let message;

    if(winner === null) {
        message = 'Draw!';
    }else {
        if (participantType === ParticipantType.SPECTATOR) {
            message = `Player ${winner} won!`;
        } else {
            message = winner === playerId ? 'You won!' : `You lose!`;
        }
    }

    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
};

export default WinnerNotification;