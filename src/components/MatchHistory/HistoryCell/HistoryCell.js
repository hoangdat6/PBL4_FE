
import React from 'react';
import styles from "./HistoryCell.module.scss";

const HistoryCell = ({ match }) => {
    const { players, scores, game_count, create_at } = match;

    return (
        <div className={styles.history_cell}>
            <div className={styles.players_cell}>
                <div className={styles.player}>
                    <a>{players[0]}</a>
                </div>
                <div className={styles.player}>
                    <a>{players[1]}</a>
                </div>
            </div>
            <div className={styles.scores}>
                <div className={styles.score}>
                    <span>{scores[0]}</span>
                </div>
                <div className={styles.score}>
                    <span>{scores[1]}</span>
                </div>
            </div>
            <div className={styles.game_count}>
                <span>{game_count}</span>
            </div>
            <div className={styles.create_at}>
                <span>{create_at}</span>
            </div>
        </div>
    )
}

export default HistoryCell;