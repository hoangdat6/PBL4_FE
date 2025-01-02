import CaroBoardUI from "../../components/CaroBoard/CaroBoardUI/CaroBoardUI";
import React, {useEffect, useState} from "react";
import styles from "./RoomPlay.module.scss";
import {useCaroGame} from "../../hooks/useCaroGame";
import useGameTimer from "../../hooks/useGameTimer";
import {useSelector} from "react-redux";
import BoardUtils from "../../utils/BoardUtils";

const RoomPlay = ({
                      roomCode,
                      sendMove,
                      isGameStarted,
                      isPlayer,
                      winnerId,
                  }) => {
    const {handleClick, board, isPlayerStart, isPlayerTurn} = useCaroGame(roomCode, sendMove);
    const {startTimer: startTimerGame, stopTimer} = useGameTimer();
    const [winningCells, setWinningCells] = useState([]);

    useEffect(() => {
        if (isGameStarted) {
            setTimeout(() => {
                startTimerGame();
            }, 500);
        }
    }, [isGameStarted]);

    const {lastMove} = useSelector((state) => state.game);

    useEffect(() => {
        if (winnerId) {
            stopTimer();
            setWinningCells(BoardUtils.getWinningCells(board).flat());
        }
    }, [winnerId, board]);

    return (
        <div className={styles.game_room__wrapper}>
            <CaroBoardUI
                board={board}
                handleClick={handleClick}
                isStartPlayer={isPlayerStart}
                isPlayer={isPlayer}
                isPlayerTurn={isPlayerTurn}
                lastMove={lastMove}
                winningCells={winningCells}
            />
        </div>
    );
};

RoomPlay.layouts = "DefaultLayout";

export default RoomPlay;