import React, {useEffect, useState} from "react";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import {useCaroGame} from "../../hooks/useCaroGame";
import RoomPlay from "../RoomPlay/RoomPlay";
import {SEND_PLAY_AGAIN, SEND_WINNER} from "../../constants/socketEndpoint";
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
import LayoutWrapper from "../../layouts/LayoutWrapper";
import PrivateRoute from "../../components/PrivateRoute";

const PlayWithFriendPage = () => {
    // states
    const { roomCode } = useParams();
    const [isJoined, setIsJoined] = useState(false);
    const [isRoomNotFound, setIsRoomNotFound] = useState(false);
    const isGameStarted = useSelector((state) => state.game.isGameStarted);

    const playerId = useSelector((state) => state.auth.userId);

    const dispatch = useDispatch();

    const { timer, startTimer } = useTimer(30); // Custom hook
    const {leaveRoomNotPopup, leaveRoomWithPopup} = useLeaveRoom();
    const {conflictRoomCode, continuePlay, continuePlayCurrentRoom} = useConflictRoom();
    const { sendMove, connect, sendPlayAgain, sendWinner, isConnected, winner, playAgain, sendMessage} = useGameWebSocket();
    const [playerInfo, setPlayerInfo] = useState(null);
    const {player1Info, player2Info} = useSelector((state) => state.room);



    useEffect(() => {
        connect(roomCode);
    },[roomCode]);

    useEffect(() => {
        if(player1Info && player2Info) {
            setPlayerInfo(player1Info.id === playerId ? player1Info : player2Info);
        }
    }, [player1Info, player2Info]);

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
            sendWinner(SEND_WINNER(roomCode), winner);
        }
    }, [winner]);

    useEffect(() => {
        if (playAgain.code === PLAY_AGAIN_ACCEPT) {
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



    const renderContent = () => {
        if (isRoomNotFound) {
            return <RoomNotFound />;
        }

        if (conflictRoomCode) {
            return (
                <RoomConflictNotification
                    onLeaveRoom={continuePlayCurrentRoomHandler}
                    onContinue={continuePlay}
                />
            );
        }

        if (!isJoined) {
            return <Loading />;
        }

        if (winner !== null) {
            return (
                <GameResult
                    winnerId={winner}
                    playerId={playerId}
                    handlePlayAgain={handleSendPlayAgain}
                    handleLeaveRoom={leaveRoomNotPopupHandler}
                    opponentPlayAgain={playAgain}
                    timer={timer}
                    playerInfo={playerInfo}
                />
            );
        }

        if (isGameStarted) {
            return <RoomPlay {...propsRoomPlay} />;
        }

        return <WaitingRoom roomCode={roomCode} handleLeaveRoom={leaveRoomWithPopup} />;
    };

    return (
        <>
            <PrivateRoute>
                <LayoutWrapper layoutType={'default'}>
                    {/*<PlayWithFriendPage />*/}
                    {renderContent()}
                </LayoutWrapper>
            </PrivateRoute>
        </>
    );
};

export default PlayWithFriendPage;