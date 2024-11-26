import React, {useEffect} from 'react';
import RoomBot from "./RoomBot";
import useGameBot from "../../hooks/useGameBot";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import Loading from "../../components/Loading/Loading";

const PlayWithBot = () => {
    const {
        board,
        isPlayerStart,
        isPlayer,
        isPlayerTurn,
        isPlaying,
        roomCode,
        handleClick,
        createRoom,
        joinRoom
    } = useGameBot();

    const { leaveRoomWithPopup } = useLeaveRoom();

    useEffect(() => {
        if(roomCode) {
            joinRoom(roomCode);
        }else {
            createRoom();
        }
    }, []);

    return (
        isPlaying ?
            <RoomBot
                board={board}
                isPlayerStart={isPlayerStart}
                isPlayer={isPlayer}
                isPlayerTurn={isPlayerTurn}
                handleClick={handleClick}
                leaveRoomWithPopup={leaveRoomWithPopup}
            />  : <Loading/>
    );
}

export default PlayWithBot;