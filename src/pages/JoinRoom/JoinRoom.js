import React, {useEffect, useState} from "react";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import useJoinRoom from "../../hooks/useJoinRoom";
import {useCaroGame} from "../../hooks/useCaroGame";
import RoomPlay from "../RoomPlay";
import {SEND_PLAY_AGAIN} from "../../constants/socketEndpoint";
import withReactContent from 'sweetalert2-react-content';
import {setParticipantType, setRoomCode} from "../../store/slices/RoomSlice";
import {PLAY_AGAIN, PLAY_AGAIN_ACCEPT} from "../../enums/PlayAgainCode";
import ParticipantType from "../../enums/participantType";
import JoinRoomResponse from "../../models/JoinRoomResponse";
import Swal from 'sweetalert2';

const JoinRoom = () => {
    const navigate = useNavigate();
    const { roomCode } = useParams();
    const [isJoined, setIsJoined] = useState(false);
    const playerId = useSelector((state) => state.auth.userId);

    const dispatch = useDispatch();

    const {leaveRoom, leaveRoomHandler, isLeaving} = useLeaveRoom();
    const { sendMove, connect, isConnected, isGameStarted, winner, sendPlayAgain, playAgain, stompClient} = useGameWebSocket();
    const {joinRoom, joinRoomState, setJoinRoomState} = useJoinRoom();
    const { board, handleClick, isPlayerStart, participantType } = useCaroGame(roomCode, sendMove);

    useEffect(() => {
        connect(roomCode);
    },[roomCode]);

    // Tạo hàm leaveRoomHandler để xử lý rời phòng
    const handleLeaveRoom = () => {
        leaveRoom(stompClient);
    };

    // Join room
    useEffect(() => {
        if (isConnected) {
            joinRoom(roomCode)
                .then((response) => {
                    const joinRoomState = new JoinRoomResponse(
                        response.data.roomCode,
                        response.data.participantType,
                        response.data.isStarted,
                    );
                    dispatch(setParticipantType(joinRoomState.participantType));
                    setJoinRoomState(joinRoomState);
                    setIsJoined(true);
                }).catch((error) => {
                    console.log(error.response.data);
                    if(error.response.status === 409) {
                        dispatch(setRoomCode(error.response.data.roomCode));
                    }else if(error.response.status === 400) {
                        navigate('/');
                    }
                });
        }
    }, [isConnected, roomCode]);

    const handleSendPlayAgain = () => {
        return sendPlayAgain(SEND_PLAY_AGAIN(roomCode), playerId);
    }

    useEffect(() => {
        if (playAgain.code === PLAY_AGAIN_ACCEPT) {
            navigate(`/room/${roomCode}`);
            window.location.reload();
        }
    }, [playAgain, roomCode]);

    const showSwal = (winner, playerId, handlePlayAgain, handleLeaveRoom, playAgain, timer) => {
        const MySwal = withReactContent(Swal);
        const message = winner === playerId ? 'Bạn Thắng' : participantType === ParticipantType.SPECTATOR ? `${winner} thắng` : `Bạn thua`;
        const playAgainMessage = playAgain.code === PLAY_AGAIN
            ? playAgain.playerId !== playerId ?  'Đối thủ muốn chơi lại!' : "Đang chờ đối thủ ..." : 'Bạn muốn chơi lại không?';

        MySwal.fire({
            title: message,
            text: `${playAgainMessage}`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Play Again',
            cancelButtonText: `Leave Room (${timer}s)`,
            reverseButtons: true,
            animation: false,
        }).then((result) => {
            if (result.isConfirmed) {
                handlePlayAgain();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                handleLeaveRoom();
            }
        });
    };


    const [timer, setTimer] = React.useState(30);

    React.useEffect(() => {
        if (winner) {
            if (timer === 0) {
                handleLeaveRoom();
                Swal.close();
            }

            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, winner]);

    const propsRoomPlay = {
        handleLeaveRoom,
        board,
        handleClick,
        isPlayerStart,
        participantType,
        winner,
        playerId,
        timer,
        showSwal,
        onPlayAgain: handleSendPlayAgain,
        onLeaveRoom: leaveRoomHandler,
        playAgain,
    }

    return (
        <>
            {!isJoined ? <Loading/> : <div>
                {joinRoomState.isStarted == true || isGameStarted ? (
                        <RoomPlay {...propsRoomPlay}/>
                ) : (
                    <WaitingRoom roomCode={roomCode} handleLeaveRoom={leaveRoomHandler}/>
                )}
            </div>
            }
        </>
    );
};

export default JoinRoom;