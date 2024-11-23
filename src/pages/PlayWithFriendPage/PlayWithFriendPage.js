import React, {useEffect, useState} from "react";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import {useCaroGame} from "../../hooks/useCaroGame";
import RoomPlay from "../RoomPlay";
import {SEND_PLAY_AGAIN} from "../../constants/socketEndpoint";
import {setParticipantType, setRoomCode} from "../../store/slices/roomSlice";
import {PLAY_AGAIN_ACCEPT} from "../../enums/PlayAgainCode";
import RoomConflictNotification from "../../components/RoomConflictNotification/RoomConflictNotification";
import useConflictRoom from "../../hooks/useConflictRoom";
import RoomService from "../../services/room.service";
import {setIsGameStarted} from "../../store/slices/gameSlice";
import useTimer from "../../hooks/useTimer";
import GameResult from "../GameResult/GameResult";
import {setPlayingRoom} from "../../store/slices/userPlaySlice";
import RoomNotFound from "../../components/RoomNotFound/RoomNotFound";
import useGameTimer from "../../hooks/useGameTimer";

const PlayWithFriendPage = () => {
    // states
    const [isJoined, setIsJoined] = useState(false);
    const [isRoomNotFound, setIsRoomNotFound] = useState(false);
    const isGameStarted = useSelector((state) => state.game.isGameStarted);

    const playerId = useSelector((state) => state.auth.userId);
    const { roomCode } = useParams();

    const dispatch = useDispatch();

    const { timer, startTimer } = useTimer(30); // Custom hook
    const {leaveRoomNotPopup, leaveRoomWithPopup} = useLeaveRoom();
    const {conflictRoomCode, continuePlay, continuePlayCurrentRoom} = useConflictRoom();
    const { sendMove, connect, sendPlayAgain, isConnected, winner, playAgain, sendMessage} = useGameWebSocket();


    useEffect(() => {
        connect(roomCode);
    },[roomCode]);

    // Join room
    useEffect(() => {
        if (isConnected) {
            RoomService.joinRoom(roomCode)
                .then((response) => {
                    const {participantType, roomCode, isStarted} = response.data;
                    // room state
                    dispatch(setParticipantType(participantType));
                    dispatch(setRoomCode(roomCode));
                    // game state
                    dispatch(setIsGameStarted(isStarted));

                    setIsJoined(true);
                }).catch((error) => {
                // console.log(error.response.data);
                if(error.response.status === 409) {
                    dispatch(setPlayingRoom(error.response.data.roomCode));
                }else if(error.response.status === 400) {
                    setIsRoomNotFound(true);
                }
            });
        }
    }, [isConnected]);

    const handleSendPlayAgain = () => {
        return sendPlayAgain(SEND_PLAY_AGAIN(roomCode), playerId);
    }

    useEffect(() => {
        if (winner) {
            startTimer(30);
        }
    }, [winner]);

    useEffect(() => {
        if (playAgain.code === PLAY_AGAIN_ACCEPT) {
            // navigate(`/room/${roomCode}`);
            window.location.reload();
        }
    }, [playAgain, roomCode]);

    useEffect(() => {
        if (timer === 0) {
            leaveRoomNotPopup();
        }
    }, [timer]);

    const propsRoomPlay = {
        roomCode,
        sendMove,
        timer,
        leaveRoomWithPopup,
    }

    const continuePlayCurrentRoomHandler = () => {
        continuePlayCurrentRoom();
        window.location.reload();
    }

    const leaveRoomNotPopupHandler = () => {
        leaveRoomNotPopup();
    }

    return (
        <>
            {isRoomNotFound ? (
                <RoomNotFound />
            ) : conflictRoomCode ? (
                <RoomConflictNotification
                    onLeaveRoom={continuePlayCurrentRoomHandler}
                    onContinue={continuePlay}
                />
            ) : !isJoined ? (
                <Loading />
            ) : winner !== null ? (
                <GameResult
                    winnerId={winner}
                    playerId={playerId}
                    handlePlayAgain={handleSendPlayAgain}
                    handleLeaveRoom={leaveRoomNotPopupHandler}
                    opponentPlayAgain={playAgain}
                    timer={timer}
                />
            ) : isGameStarted ? (
                <RoomPlay {...propsRoomPlay} />
            ) : (
                <WaitingRoom roomCode={roomCode} handleLeaveRoom={leaveRoomWithPopup} />
            )}
        </>
    );
};

export default PlayWithFriendPage;