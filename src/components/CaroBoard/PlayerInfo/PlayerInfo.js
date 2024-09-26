import React from 'react';
import styles from './PlayerInfo.module.scss';


const PlayerInfo = ({playerName, time, score, avatar, rankIcon, checkers, reverse}) => (

    <div className={`${styles.player} ${reverse ? "flex-row-reverse" : ""}`}>
    {/*<div className={`${reverse ? "flex-row-reverse" : ""}`}>*/}
        <div className={`${styles.player_info_container} ${reverse ? "flex-row-reverse" : ""}`}>
            <div className={`${styles.player_score}`}>
                <span>{score}</span>
            </div>
            <div className={`${styles.avatar}`} style={{width: '50px', height: '50px'}}>
                <img src={avatar} alt={`${playerName}'s avatar`} className="img-fluid"/>
            </div>
            <div className={`${styles.player_info} d-flex flex-column`}>
                <span className="fw-bold text-light">{playerName}</span>
                <span className="text-light">{time}</span>
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

export default PlayerInfo;