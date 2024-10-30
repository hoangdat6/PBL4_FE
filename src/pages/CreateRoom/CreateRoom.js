import useGameWebSocket from "../../hooks/useGameWebSocket";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import {FirstMoveOption} from "../../enums/FirstMoveOption";
import CaroBoard from "../../components/CaroBoard/CaroBoard";
import {useSelector} from "react-redux";
import useLeaveRoom from "../../hooks/useLeaveRoom";

const CreateRoom = () => {
    const [roomCode, setRoomCode] = useState(null);
    const navigate = useNavigate();
    const playerId  = useSelector((state) => state.auth.userId);
    const gameState = useSelector((state) => state.caroGame.gameState);

    // Hàm tạo phòng
    const handleCreateRoom = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/create`, null, {
                params: {
                    userId: playerId,
                    firstMoveOption: FirstMoveOption.ROOM_OWNER,
                }
            }).then((response) => {
                console.log('Room created:', response.data);
                setRoomCode(response.data.roomCode);
            }).catch((error) => {
                if (error.response) {
                    console.error('Error creating room:', error.response.data);
                } else {
                    console.error('Error creating room:', error.message);
                }
            });

        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    // Tạo phòng khi component được render lần đầu
    useEffect(() => {
        handleCreateRoom();
    }, []);

    // Kết nối WebSocket khi roomCode có giá trị
    const {loading, sendMove, stompClient, isGameStarted} = useGameWebSocket(roomCode, playerId);

    // Xử lý rời phòng
    const { handleLeaveRoom } = useLeaveRoom(stompClient, roomCode, playerId);
    useEffect(() => {
        if (isGameStarted) {
            navigate(`/room/${roomCode}`, { replace: true });
        }
    }, [isGameStarted]);


    if (loading) {
        console.log("Loading...");
        return <Loading />;
    }

    return (
        <>
            {isGameStarted ? (
                <CaroBoard
                    sendMove={sendMove}
                    gameState={gameState}
                    handleLeaveRoom={handleLeaveRoom}
                />
            ) : (
                <WaitingRoom roomCode={roomCode} handleLeaveRoom={handleLeaveRoom} />
            )}
        </>
    );
};

export default CreateRoom;