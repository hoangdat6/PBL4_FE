import React from 'react';
import styles from './CaroBoard.module.scss';
import useWebSocket from "../../hooks/useWebSocket";
import { useCaroGame } from '../../hooks/useCaroGame';
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import CaroBoardUI from "./CaroBoardUI/CaroBoardUI";


import War from "../../assets/statics/imgs/war.svg";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";

import checker3 from "../../assets/statics/imgs/checker3.svg";
import checker4 from "../../assets/statics/imgs/checker4.svg";


const player1 = {
    playerName: "Hoang Dat",
    time: "05:00",
    score: "0",
    avatar: Avatar,
    rankIcon: Rank,
    checkers: checker1,
    reverse: true,
};

const player2 = {
    playerName: "Do Tuan",
    time: "05:00",
    score: "0",
    avatar: Avatar,
    rankIcon: Rank,
    checkers: checker2,
};

const CaroBoard = ({roomCode}) => {
    const { sendMessage, lastMessage } = useWebSocket(`http://localhost:8080/game?roomCode=${roomCode}`);
    const { board, handleClick } = useCaroGame(roomCode, sendMessage, lastMessage);

    return (
        <section className={styles.boardSection}>
            <section className={`${styles.game_section}`}>
                <div className={`${styles.game_container}`}>
                    {/* Player 1 */}
                    <PlayerInfo {...player1} />
                    {/* VS icon */}
                    <div className={styles.vs_icon}>
                        <img src={War} alt="VS icon" />
                    </div>

                    {/* Player 2 */}
                    <PlayerInfo {...player2} />
                </div>
            </section>

            {/* Caro Board */}
            <CaroBoardUI board={board} handleClick={handleClick} />
        </section>
    );
};




export default CaroBoard;
