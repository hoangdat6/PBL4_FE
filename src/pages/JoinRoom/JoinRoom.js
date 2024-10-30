import React, { useEffect, useState, useCallback } from "react";
import useGameWebSocket from "../../hooks/useGameWebSocket";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import CaroBoard from "../../components/CaroBoard/CaroBoard";
import { useSnackbar } from "../../hooks/useSnackbar";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import {useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JoinRoom = () => {
    const navigate = useNavigate();
    const { roomCode } = useParams(); // Lấy roomCode từ URL
    const [isJoined, setIsJoined] = useState(false);
    const [roomCodeResponse, setRoomCode] = useState(null);
    const [hasProcessedResponse, setHasProcessedResponse] = useState(false);
    const playerId = useSelector((state) => state.auth.userId);

    const { open, message, autoHideDuration, openSnackbar, closeSnackbar } = useSnackbar();

    // Kết nối WebSocket khi roomCode có giá trị
    const { sendMove, stompClient, isConnected} = useGameWebSocket(roomCode, playerId);

    // Join room
    useEffect(() => {
        if (isConnected) {
            axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/join`, null, {
                params: {
                    roomCode: roomCode,
                    playerId: playerId,
                }
            }).then((response) => {
                setRoomCode(response.data.roomCode);
            }).catch((error) => {
                console.log("Player ID: ", playerId);
                if (error.response) {
                    console.error('Error joining room:', error.response.data);
                } else {
                    console.error('Error joining room:', error.message);
                }
                setRoomCode(undefined);
            });
        }
    }, [isConnected, roomCode, playerId]);

    // Xử lý kết quả join room
    useEffect(() => {
        if (roomCodeResponse !== null && !hasProcessedResponse) {
            if (!roomCodeResponse) {
                openSnackbar('Failed to join room. Redirecting to home page.');
                handleLeaveRoom();
            } else {
                openSnackbar('Joined room successfully.');
                setIsJoined(true);
            }
            setHasProcessedResponse(true);
        }
    }, [roomCodeResponse, hasProcessedResponse, navigate, openSnackbar]);

    const { handleLeaveRoom } = useLeaveRoom(stompClient, roomCode, playerId);
    console.log('roomCode:', roomCode);

    return (
        <>
            {isJoined ? (
                <div>
                    <CaroBoard
                        sendMove={sendMove}
                        handleLeaveRoom={handleLeaveRoom}
                    />
                    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={closeSnackbar}>
                        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </div>
            ) : <Loading />}
        </>
    );
};

export default JoinRoom;