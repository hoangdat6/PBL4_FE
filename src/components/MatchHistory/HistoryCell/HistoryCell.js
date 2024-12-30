import React from "react";
import styles from "./HistoryCell.module.scss";
import useProfile from "../../../pages/Profile/UseProfile";
import PlayerProfile from "../../PlayerProfile/PlayerProfile";

const HistoryCell = ({ match }) => {
    const { roomId, player1, player2, createdAt } = match;

    const classPlayer1 = player1.score > player2.score ? styles.winner : player1.score === player2.score ? styles.draw : styles.loser;
    const classPlayer2 = player2.score > player1.score ? styles.winner : player1.score === player2.score ? styles.draw : styles.loser;

    const { playerProfile, isLoading, isShowProfile, showProfile, hideProfile } = useProfile();


    return (
        <div className={styles.history_cell}>

            {/* Hiển thị thông tin người chơi */}
            <div className={styles.players_cell}>
                <PlayerProfile
                    playerProfile={playerProfile}
                    isLoading={isLoading}
                    isShowProfile={isShowProfile}
                    toggleShowProfile={hideProfile}
                />
                <div className={styles.player}>
                    <a
                        onClick={() => showProfile(player1.id)}
                    >{player1.name}</a>
                </div>
                <div className={styles.player}>
                    <a
                        onClick={() => showProfile(player2.id)}
                    >{player2.name}</a>
                </div>
            </div>

            {/* Hiển thị tỉ số */}
            <div className={styles.scores}>
                <div className={`${styles.score} ${classPlayer1}`}>
                    <span>{player1.score}</span>
                </div>
                <div className={`${styles.score} ${classPlayer2}`}>
                    <span>{player2.score}</span>
                </div>
            </div>

            <div className={styles.game_count}>
                <span>{player1.score + player2.score}</span>
            </div>

            {/* Hiển thị thời gian tạo */}
            <div className={styles.create_at}>
                <span>{new Date(createdAt).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default HistoryCell;
