import CaroBoardUI from "../../components/CaroBoard/CaroBoardUI/CaroBoardUI";
import React, {useEffect} from "react";
import styles from "./RoomPlay.module.scss";
import PlayerInfo from "../../components/CaroBoard/PlayerInfo/PlayerInfo";
import War from "../../assets/statics/imgs/war.svg";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";
import {useSelector} from "react-redux";
import {useCaroGame} from "../../hooks/useCaroGame";
import useGameTimer from "../../hooks/useGameTimer";
import ChatBox from "../../components/ChatBox/ChatBox";
import SpectatorList from "../../components/SpectatorList/SpectatorList";
import ParticipantType from "../../enums/participantType";

const RoomPlay = ({
                      roomCode, sendMove,
                      leaveRoomWithPopup,
                  }) => {
    const {handleClick, board, isPlayerStart, participantType, isPlayerTurn} = useCaroGame(roomCode, sendMove);
    const {startTimer} = useGameTimer();

    useEffect(() => {

        setTimeout(() => {
            startTimer();
        }, 1500);
    }, []);

    const player1Info = useSelector((state) => state.room.player1Info);
    const player2Info = useSelector((state) => state.room.player2Info);

    const {
        remainTime: remainTime1, remainMoveDuration: remainMoveDuration1, playedTime: playedTime1
    } = useSelector((state) => state.game.playerTimeInfo1);

    const {
        remainTime: remainTime2, remainMoveDuration: remainMoveDuration2, playedTime: playedTime2,
    } = useSelector((state) => state.game.playerTimeInfo2);

    const {totalTime, moveDuration} = useSelector((state) => state.game.gameConfig);
    const isInfiniteTime = totalTime < 0;

    const player1 = {
        playerId: player1Info.id,
        playerName: player1Info.name,
        time: isInfiniteTime ? playedTime1 : remainTime1,
        remainMoveDuration: isInfiniteTime ? -1 : remainMoveDuration1,
        moveDuration,
        isInfiniteTime,
        score: player1Info.matchScore,
        avatar: player1Info.avatar || Avatar,
        rankIcon: Rank,
        checkers: player1Info.checker === 1 ? checker1 : checker2,
        isTurn: player1Info.isTurn,
        reverse: true,
    }

    const player2 = {
        playerId: player2Info.id,
        playerName: player2Info.name,
        time: isInfiniteTime ? playedTime2 : remainTime2,
        remainMoveDuration: isInfiniteTime ? -1 : remainMoveDuration2,
        moveDuration,
        isInfiniteTime,
        score: player2Info.matchScore,
        avatar: player2Info.avatar || Avatar,
        rankIcon: Rank,
        isTurn: player2Info.isTurn,
        checkers: player2Info.checker === 1 ? checker1 : checker2,
    }

    const [isPlayer, setIsPlayer] = React.useState(true);

    useEffect(() => {
        setIsPlayer(participantType === ParticipantType.PLAYER)
    }, []);

    return (
        <div className={styles.game_room__wrapper}>
            <div className={styles.left_side}>
                {
                    isPlayer &&
                    <SpectatorList spectators={[]}/>
                }
            </div>
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
                />

                {/* Nút rời khỏi phòng */}
                <button className={styles.leave_button} onClick={leaveRoomWithPopup}>
                    Rời khỏi phòng
                </button>
                {/*<ChatBubble />*/}
            </section>
            <div className={styles.right_side}>
                {
                    isPlayer &&
                    <ChatBox/>
                }
            </div>
        </div>
    );
};

RoomPlay.layouts = "DefaultLayout";

export default RoomPlay;