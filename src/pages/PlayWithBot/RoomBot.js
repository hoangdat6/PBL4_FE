import CaroBoardUI from "../../components/CaroBoard/CaroBoardUI/CaroBoardUI";
import React from "react";
import styles from "../RoomPlay/RoomPlay.module.scss";
import PlayerInfo from "../../components/CaroBoard/PlayerInfo/PlayerInfo";
import War from "../../assets/statics/imgs/war.svg";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";

const RoomBot = ({
                        board,
                        isPlayerStart,
                        isPlayer,
                        isPlayerTurn,
                        handleClick,
                        leaveRoomWithPopup,
                     lastMove

                 }) => {

    const player1 = {
        playerId: 1,
        playerName: "Player",
        time: 0,
        remainMoveDuration: 0,
        moveDuration: 0,
        isInfiniteTime: true,
        score: 0,
        avatar: Avatar,
        rankIcon: Rank,
        checkers: checker1,
        isTurn: true,
        reverse: true,
    }

    const player2 = {
        playerId: -1,
        playerName: "Bot",
        time: 0,
        remainMoveDuration: 0,
        moveDuration: 0,
        isInfiniteTime: true,
        score: 0,
        avatar: Avatar,
        rankIcon: Rank,
        checkers: checker2,
        isTurn: false,
        reverse: false,
    }



    return (
        <div className={styles.game_room__wrapper}>
            <div className={styles.left_side}></div>
            <section className={styles.boardSection}>
                <section className={`${styles.game_section}`}>
                    <div className={`${styles.game_container}`}>
                        {/* Player 1 */}
                        <PlayerInfo {...player1} />
                        {/* VS icon */}
                        <div className={styles.vs_icon}>
                            <img src={War} alt="VS icon"/>
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
                    isPlayer={isPlayer}
                    isPlayerTurn={isPlayerTurn}
                    lastMove={lastMove}
                />

                {/* Nút rời khỏi phòng */}
                <button className={styles.leave_button} onClick={leaveRoomWithPopup}>
                    Rời khỏi phòng
                </button>
                {/*<ChatBubble />*/}
            </section>
            <div className={styles.right_side}></div>
        </div>
    );
};

RoomBot.layouts = "DefaultLayout";

export default RoomBot;