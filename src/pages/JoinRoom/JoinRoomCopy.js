import React, { useEffect, useState, useCallback } from "react";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import CaroBoard from "../../components/CaroBoard/CaroBoard";
import { useSnackbar } from "../../hooks/useSnackbar";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import JoinRoomResponse from "../../models/JoinRoomResponse";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import {setParticipantType, setRoomConfig} from "../../store/slices/caroGameSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JoinRoom = () => {
    const navigate = useNavigate();
    const { roomCode } = useParams(); // Lấy roomCode từ URL
    const [isJoined, setIsJoined] = useState(false);
    const [hasProcessedResponse, setHasProcessedResponse] = useState(false);
    const playerId = useSelector((state) => state.auth.userId);
    const [joinRoomState, setJoinRoomState] = useState(new JoinRoomResponse());
    const dispatch = useDispatch();

    const { open, message, autoHideDuration, openSnackbar, closeSnackbar, stompClient } = useSnackbar();

    // Kết nối WebSocket khi roomCode có giá trị
    const { sendMove, isConnected, connect, isGameStarted} = useGameWebSocket();

    useEffect(() => {
        connect(roomCode, playerId);
    },[roomCode, playerId]);
    // Hook để rời phòng
    const leaveRoom = useLeaveRoom();

    // Tạo hàm leaveRoomHandler để xử lý rời phòng
    const leaveRoomHandler = () => {
        leaveRoom(stompClient, roomCode);
    };

    const JoinRoom = async () => {
        return await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/join`, null, {
            params: {
                roomCode: roomCode,
                playerId: playerId,
            }
        }).then((response) => {
            const joinRoomState = new JoinRoomResponse(
                response.data.roomCode,
                response.data.participantType,
                response.data.isStarted,
            )
            console.log(joinRoomState);
            dispatch(setParticipantType(joinRoomState.participantType));
            setJoinRoomState(joinRoomState);
        }).catch((error) => {
            if (error.response) {
                console.error('Error joining room:', error.response.data);
            } else {
                console.error('Error joining room:', error.message);
            }
            navigate('/');
        });
    }

    // Join room
    useEffect(() => {
        if (isConnected) {
            JoinRoom().then(() => {
                console.log('Join room request sent.');
            });
        }
    }, [isConnected, roomCode, playerId]);

    // Xử lý kết quả join room
    useEffect(() => {
        if (joinRoomState !== null && !hasProcessedResponse) {
            if (!joinRoomState) {
                openSnackbar('Failed to join room. Redirecting to home page.');
                leaveRoomHandler();
            } else {
                openSnackbar('Joined room successfully.');
                setIsJoined(true);
            }
            setHasProcessedResponse(true);
        }
    }, [joinRoomState, hasProcessedResponse, navigate, openSnackbar]);

    return (
        <>
            {!isJoined ? <Loading/> : <div>
                {joinRoomState.isStarted == true || isGameStarted ? (
                    <div>
                        <CaroBoard
                            sendMove={sendMove}
                            handleLeaveRoom={leaveRoomHandler}
                        />
                        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={closeSnackbar}>
                            <Alert onClose={closeSnackbar} severity="error" sx={{width: '100%'}}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </div>
                ) : (
                    <WaitingRoom roomCode={roomCode} handleLeaveRoom={leaveRoomHandler}/>
                )}
            </div>
            }
        </>
    );
};

export default JoinRoom;