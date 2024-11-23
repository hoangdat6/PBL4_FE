import React from 'react';
import styles from './PlayerInfo.module.scss';
const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const PlayerInfo = ({
                        playerId,
                        playerName,
                        time,
                        remainMoveDuration,
                        moveDuration,
                        isInfiniteTime,
                        score,
                        avatar,
                        rankIcon,
                        checkers,
                        isTurn,
                        reverse
}) => {

    const progressPercentage = isInfiniteTime ? 100 : (remainMoveDuration / moveDuration) * 100;

    return (
        <div className={`${styles.player} ${reverse ? "flex-row-reverse" : ""}`}>
            <div className={`${styles.player_info_container} ${reverse ? "flex-row-reverse" : ""}`}>
                <div className={`${styles.player_score}`}>
                    <span>{score}</span>
                </div>
                <div className={`${styles.avatar}`} style={{width: '50px', height: '50px'}}>
                    <img src={avatar} alt={`${playerName}'s avatar`} className="img-fluid"/>
                </div>
                <div className={`${styles.player_info} d-flex flex-column `}>
                    <span className={`fw-bold text-light ${reverse ? "text-end" : ""}`}>{playerName}</span>
                    <span className={`text-light ${reverse ? "text-end" : ""}`}>{formatTime(time)}</span>
                    {!isInfiniteTime && isTurn && (
                        <div className={styles.progressBarContainer}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    )}

                </div>
            </div>
            <div className={`${styles.player_rank} ${reverse ? "flex-row-reverse" : ""}`}>
                <div className={`${styles.checkers}`} style={{width: '50px', height: '50px'}}>
                    <img src={checkers} alt="checkers 1" className="img-fluid"/>
                </div>
                <div className={`${styles.rank_icon}`}>
                    <img src={rankIcon} alt="Player 2 token" className="img-fluid"/>
                </div>
            </div>
        </div>);
}


export default PlayerInfo;