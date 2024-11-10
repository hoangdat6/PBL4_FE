import React, { useEffect, useState } from 'react';
import ConfigGame from "../../components/ConfigGame/ConfigGame";
import useCreateRoom from "../../hooks/useCreateRoom";
import { useSelector, useDispatch } from "react-redux";
import RoomConflictNotification from "../../components/RoomConflictNotification/RoomConflictNotification";
import {setRoomCode, setRoomConflict} from "../../store/slices/RoomSlice";
import {useNavigate} from "react-router-dom";
import useLeaveRoom from "../../hooks/useLeaveRoom";

const CreateRoomPage = ({ isOpen, setIsOpen }) => {
    const conflictRoomCode = useSelector((state) => state.room.conflictRoomCode);
    const createRoom = useCreateRoom();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const {leaveRoom} = useLeaveRoom();

    const handleLeaveRoom = () => {
        dispatch(setRoomConflict(null));
        leaveRoom();
    };

    const handleContinue = () => {
        dispatch(setRoomCode(conflictRoomCode));
        navigator(`/room/${conflictRoomCode}`);
    };

    return (
        <>
            {conflictRoomCode ? (
                <RoomConflictNotification
                    onLeaveRoom={handleLeaveRoom}
                    onContinue={handleContinue}
                />
            ) : (
                <ConfigGame isOpen={isOpen} setIsOpen={setIsOpen} {...createRoom} />
            )}
        </>
    );
};

export default CreateRoomPage;