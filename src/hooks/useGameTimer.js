import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "./useTimer";
import {
    setPlayerTimeInfo1,
    setPlayerTimeInfo2,
    setRemainMoveDuration1,
    setRemainMoveDuration2, setWinner,
} from "../store/slices/gameSlice";

const useGameTimer = () => {
    const dispatch = useDispatch();

    const { moveDuration } = useSelector((state) => state.game.gameConfig);
    const { playerTimeInfo1, playerTimeInfo2 } = useSelector((state) => state.game);
    const { player1Info, player2Info } = useSelector((state) => state.room);

    const { timer: timer1, startTimer: startTimer1, resetTimer: resetTimer1 } = useTimer(playerTimeInfo1.remainMoveDuration);
    const { timer: timer2, startTimer: startTimer2, resetTimer: resetTimer2 } = useTimer(playerTimeInfo2.remainMoveDuration);

    useEffect(() => {
        if(player1Info.isTurn) {
            startTimer1(playerTimeInfo1.remainMoveDuration);
        }else {
            startTimer2(playerTimeInfo2.remainMoveDuration);
        }
    }, []);

    useEffect(() => {
        console.log("call useGameTimer");
        if (player1Info.isTurn) {
            console.log("start timer 1 with remain move duration", playerTimeInfo1.remainMoveDuration);
            startTimer1(playerTimeInfo1.remainMoveDuration);
            resetTimer2(moveDuration);
            dispatch(setRemainMoveDuration2(moveDuration));
        } else if (player2Info.isTurn) {
            console.log("start timer 2 with remain move duration", playerTimeInfo2.remainMoveDuration);
            startTimer2(playerTimeInfo2.remainMoveDuration);
            resetTimer1(moveDuration);
            dispatch(setRemainMoveDuration1(moveDuration));
        }
    }, [player1Info.isTurn]);

    useEffect(() => {
        console.log("set remain move duration");

        if(timer1 === 0) {
            dispatch(setWinner(player2Info.id));
        }

        if(timer2 === 0) {
            dispatch(setWinner(player1Info.id));
        }

         if(player1Info.isTurn) {
             dispatch(setPlayerTimeInfo1({
                remainTime: Math.max(playerTimeInfo1.remainTime - 1, 0),
                remainMoveDuration: timer1,
                playedTime: playerTimeInfo1.playedTime + 1,
             }))
         }else {
            dispatch(setPlayerTimeInfo2({
                remainTime: Math.max(playerTimeInfo2.remainTime - 1, 0),
                remainMoveDuration: timer2,
                playedTime: playerTimeInfo2.playedTime + 1,
            }))
         }
    }, [timer1, timer2]);



    return { timer1, timer2};
};

export default useGameTimer;
