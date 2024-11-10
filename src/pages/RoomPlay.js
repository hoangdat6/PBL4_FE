import CaroBoardUI from "../components/CaroBoard/CaroBoardUI/CaroBoardUI";
import React from "react";
import styles from "./RoomPlay.module.scss";
import PlayerInfo from "../components/CaroBoard/PlayerInfo/PlayerInfo";
import War from "../assets/statics/imgs/war.svg";
import Avatar from "../assets/statics/imgs/Avatar.png";
import Rank from "../assets/statics/imgs/Rank.svg";
import checker1 from "../assets/statics/imgs/checker1.svg";
import checker2 from "../assets/statics/imgs/checker2.svg";
import WinnerNotification from "../components/WinnerNotification/WinnerNotification";

let player1 = {
    playerId: 1,
    playerName: "Hoang Dat",
    time: "05:00",
    score: "0",
    avatar: Avatar,
    rankIcon: Rank,
    checkers: checker1,
    reverse: true,
};

let player2 = {
    playerId: 2,
    playerName: "Do Tuan",
    time: "05:00",
    score: "0",
    avatar: Avatar,
    rankIcon: Rank,
    checkers: checker2,
};

const RoomPlay = ({
                      handleLeaveRoom,
                      board,
                      handleClick,
                      isPlayerStart,
                      participantType,
                      winner,
                      playerId,
                      timer,
                      showSwal,
                      onPlayAgain,
                      playAgain,
                  }) => {
    return (
        <div>
            <div className={styles.winner_notif}>
                {winner && showSwal(winner, playerId, onPlayAgain, handleLeaveRoom, playAgain, timer)}
            </div>
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
                <CaroBoardUI
                    board={board}
                    handleClick={handleClick}
                    isStartPlayer={isPlayerStart}
                    participantType={participantType}
                />
                {/* Nút rời khỏi phòng */}
                <button className={styles.leave_button} onClick={handleLeaveRoom}>
                    Rời khỏi phòng ({timer}s)
                </button>
            </section>
        </div>
    );
};

RoomPlay.layouts = "DefaultLayout";

export default RoomPlay;