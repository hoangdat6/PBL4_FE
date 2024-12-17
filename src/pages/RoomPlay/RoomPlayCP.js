import CaroBoardUI from "../../components/CaroBoard/CaroBoardUI/CaroBoardUI";
import React, {useEffect} from "react";
import styles from "./RoomPlay.module.scss";
import {useCaroGame} from "../../hooks/useCaroGame";
import useGameTimer from "../../hooks/useGameTimer";
import {useSelector} from "react-redux";

const RoomPlayCP = ({
                        roomCode,
                        sendMove,
                        isGameStarted,
                        isPlayer
                  }) => {
    const { handleClick, board, isPlayerStart, isPlayerTurn } = useCaroGame(roomCode, sendMove);
    const {startTimer: startTimerGame} = useGameTimer();

    useEffect(() => {
        if(isGameStarted) {
            setTimeout(() => {
                startTimerGame();
            }, 1500);
        }
    }, [isGameStarted]);

    const { lastMove } = useSelector((state) => state.game);


    return (
        <div className={styles.game_room__wrapper}>
            <CaroBoardUI
                board={board}
                handleClick={handleClick}
                isStartPlayer={isPlayerStart}
                isPlayer={isPlayer}
                isPlayerTurn={isPlayerTurn}
                lastMove={lastMove}
            />
        </div>
    );
};

RoomPlayCP.layouts = "DefaultLayout";

export default RoomPlayCP;