import React, {useEffect, useState} from "react";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
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
import PrivateRoute from "../../components/PrivateRoute";
import RoomPlayLayout from "../../layouts/RoomPlayLayout";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";
import ChatBox from "../../components/ChatBox/ChatBox";
import RoomPlay from "../RoomPlay/RoomPlay";
import SpectatorBar from "../SpectatorBar/SpectatorBar";

const PlayWithFriendPage = () => {
    // states
    // Waiting :  phòng chờ
    // loading : Tham gia phòng
    // isJoined : Đã tham gia phòng
    // connected : đã kết nối socket
    // playing : đang chơi
    // pending : đang chờ đối thủ

    const {roomCode} = useParams();
    const [isJoined, setIsJoined] = useState(false);
    const [isRoomNotFound, setIsRoomNotFound] = useState(false);
    const isGameStarted = useSelector((state) => state.game.isGameStarted);
    const [showResult, setShowResult] = useState(false); // Trạng thái để kiểm soát hiển thị trang kết quả
    const [isPlayer, setIsPlayer] = React.useState(true);

    const playerId = useSelector((state) => state.auth.userId);

    const dispatch = useDispatch();

    const {timer, startTimer} = useTimer(30); // Custom hook
    const {leaveRoomNotPopup, leaveRoomWithPopup} = useLeaveRoom();
    const {conflictRoomCode, continuePlay, continuePlayCurrentRoom} = useConflictRoom();
    const {
        sendMove,
        connect,
        sendPlayAgain,
        sendWinner,
        isConnected,
        winnerId,
        playAgain,
        stompClient,
    } = useGameWebSocket();

    const [playerInfo, setPlayerInfo] = useState(null);
    const {player1Info, player2Info} = useSelector((state) => state.room);

    useEffect(() => {
        connect(roomCode);
    }, [roomCode]);

    useEffect(() => {
        if (player1Info && player2Info) {
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
                if (error.response.status === 409) {
                    dispatch(setPlayingRoom(error.response.data.roomCode));
                } else if (error.response.status === 400) {
                    setIsRoomNotFound(true);
                }
            });
        }
    }, [isConnected]);

    const handleSendPlayAgain = () => {
        return sendPlayAgain(SEND_PLAY_AGAIN(roomCode), playerId);
    }

    useEffect(() => {
        if (winnerId) {
            sendWinner(SEND_WINNER(roomCode), winnerId);

            const timeout = setTimeout(() => {
                setShowResult(true);
                startTimer(30);
            }, 4000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [winnerId]);

    useEffect(() => {
        if (playAgain.code === PLAY_AGAIN_ACCEPT) {
            window.location.reload();
        }
    }, [playAgain, roomCode]);

    useEffect(() => {
        if (timer === 0) {
            leaveRoomNotPopup();
        }
    }, [timer, leaveRoomNotPopup]);

    const continuePlayCurrentRoomHandler = () => {
        continuePlayCurrentRoom();
        window.location.reload();
    }

    useEffect(() => {
        if (isGameStarted) {
            setIsPlayer(playerId === player1Info.id || playerId === player2Info.id);
        }
    }, [isGameStarted])

    const propsRoomPlay = {
        roomCode,
        sendMove,
        isGameStarted,
        isPlayer,
        winnerId,
    }

    const {
        remainTime: remainTime1, remainMoveDuration: remainMoveDuration1
    } = useSelector((state) => state.game.playerTimeInfo1);

    const {
        remainTime: remainTime2, remainMoveDuration: remainMoveDuration2
    } = useSelector((state) => state.game.playerTimeInfo2);

    const {moveDuration} = useSelector((state) => state.game.gameConfig);

    const player1 = {
        playerId: player1Info.id,
        playerName: player1Info.name,
        time: remainTime1,
        remainMoveDuration: remainMoveDuration1,
        moveDuration,
        matchScore: player1Info.matchScore,
        avatar: player1Info.avatar || Avatar,
        rankIcon: Rank,
        checkers: player1Info.checker === 1 ? checker1 : checker2,
        isTurn: player1Info.isTurn,
        reverse: true,
    }

    const player2 = {
        playerId: player2Info.id,
        playerName: player2Info.name,
        time: remainTime2,
        remainMoveDuration: remainMoveDuration2,
        moveDuration,
        matchScore: player2Info.matchScore,
        avatar: player2Info.avatar || Avatar,
        rankIcon: Rank,
        isTurn: player2Info.isTurn,
        checkers: player2Info.checker === 1 ? checker1 : checker2,
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

        if (winnerId !== null && showResult) {

            return (
                <GameResult
                    winnerId={winnerId}
                    playerId={playerId}
                    handlePlayAgain={handleSendPlayAgain}
                    handleLeaveRoom={leaveRoomWithPopup}
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

    const leftSide = isPlayer && <SpectatorBar
        stompClient={stompClient}
        roomCode={roomCode}
        isConnected={isConnected}
    />;
    const rightSide = isPlayer && <ChatBox
        stompClient={stompClient}
        roomCode={roomCode}
        isConnected={isConnected}
    />;

    return (
        <>
            <PrivateRoute>
                <RoomPlayLayout
                    player1={player1}
                    player2={player2}
                    onLeaveRoom={leaveRoomWithPopup}
                    leftSide={leftSide}
                    rightSide={rightSide}
                    isGameStarted={isGameStarted}
                    winnerId={winnerId}
                    isPlayer={isPlayer}
                    playerId={playerId}
                    showResult={showResult}
                >
                    {renderContent()}
                </RoomPlayLayout>
            </PrivateRoute>
        </>
    );
};

export default PlayWithFriendPage;