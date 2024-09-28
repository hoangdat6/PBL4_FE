import React from 'react';
import { useParams } from 'react-router-dom'; // Để lấy roomId từ URL
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
    playerName: "Hoang Dat",
    time: "05:00",
    score: "0",
    avatar: Avatar,
    rankIcon: Rank,
    checkers: checker2,
};

const CaroBoard = () => {
    const { roomId } = useParams(); // Lấy roomId từ URL
    console.log(roomId);
    const { sendMessage, lastMessage } = useWebSocket(`http://localhost:8080/game?roomId=${roomId}`, roomId, `/topic/room/${roomId}`); // Kết nối WebSocket
    sendMessage('/app/joinRoom', {
        roomId: roomId,
        playerName: 'Hoang Dat',
    });
    const { board, handleClick } = useCaroGame(roomId, sendMessage, lastMessage);

    return (
        <section className={styles.boardSection}>
            {/*header*/}

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
