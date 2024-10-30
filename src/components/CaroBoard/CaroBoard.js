import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'; // Để lấy roomCode từ URL
import styles from './CaroBoard.module.scss';
import useWebSocket from "../../hooks/useGameWebSocket";
import { useCaroGame } from '../../hooks/useCaroGame';
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import CaroBoardUI from "./CaroBoardUI/CaroBoardUI";

import War from "../../assets/statics/imgs/war.svg";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import Loading from "../Loading/Loading";
import {useSelector} from "react-redux";

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

const CaroBoard = ({sendMove, handleLeaveRoom}) => {
    const { roomCode } = useParams();
    const { board, handleClick, isPlayerStart } = useCaroGame(roomCode, sendMove);
    const userId = useSelector((state) => state.auth.userId);

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
            <CaroBoardUI
                board={board}
                handleClick={handleClick}
                isStartPlayer={isPlayerStart}
            />

            {/* Nút rời khỏi phòng */}
            <button className={styles.leaveButton} onClick={() => {handleLeaveRoom()}}>
                Rời khỏi phòng
            </button>
        </section>
    );
};

export default CaroBoard;
