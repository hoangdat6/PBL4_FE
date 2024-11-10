// mode: infinity, limit
// timeInit: is the time received from the server
// in the infinity mode timeInit up to
// in the limit mode timeInit down from init time to zero
// if timeinit == 0, this player won
import {useState} from "react";
import {useSelector} from "react-redux";

const useTimer = ({
                      timeMoveInit, timeRoomInit, timeMovePlayerState, timeRoomPlayerState, timeMoveOppState, timeRoomOppState, isPlayerTurnState
                  }) => {
    const [isInfiniteTimeMove, setIsInfiniteTimeMove] = useState(timeMoveInit === -1);
    const [isInfiniteTimeRoom, setIsInfiniteTimeRoom] = useState(timeRoomInit === -1);

    const [timeMovePlayer, setTimeMovePlayer] = useState(timeMovePlayerState);
    const [timeRoomPlayer, setTimeRoomPlayer] = useState(timeRoomPlayerState);
    const [timeMoveOpponent, setTimeMoveOpponent] = useState(timeMoveOppState);
    const [timeRoomOpponent, setTimeRoomOpponent] = useState(timeRoomOppState);
    const [isPlayerTurn, setIsPlayerTurn] = useState(isPlayerTurnState);

    const roomConfig = useSelector((state) => state.room.roomConfig);

    const counter = () => {
        if(isPlayerTurn) {

        }else {

        }
    }

    const counterMs = () => {

    }

    return {
        timeMovePlayer,
        timeRoomPlayer,
        timeMoveOpponent,
        timeRoomOpponent,
        isPlayerTurn,
    }

}

export default useTimer;