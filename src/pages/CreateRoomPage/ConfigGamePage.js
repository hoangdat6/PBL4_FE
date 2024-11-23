import React from 'react';
import ConfigGame from "../../components/ConfigGame/ConfigGame";
import useCreateRoom from "../../hooks/useCreateRoom";
import RoomConflictNotification from "../../components/RoomConflictNotification/RoomConflictNotification";
import useConflictRoom from "../../hooks/useConflictRoom";
import {useDispatch} from "react-redux";
import {setPlayingRoom} from "../../store/slices/userPlaySlice";

const CreateRoomPage = ({ isOpen, setIsOpen }) => {
    const createRoom = useCreateRoom();
    const dispatch = useDispatch();

    const {conflictRoomCode, continuePlayCurrentRoom, continuePlay} = useConflictRoom();


    const continuePlayHandler = () => {
        continuePlay();
    }

    const continuePlayCurrentRoomHandler = () => {
        // rời phòng hiện tại
        continuePlayCurrentRoom();
        dispatch(setPlayingRoom(null));
    }

    return (
        <>
            {conflictRoomCode ? (
                <RoomConflictNotification
                    onLeaveRoom={continuePlayCurrentRoomHandler}
                    onContinue={continuePlayHandler}
                />
            ) : (
                <ConfigGame isOpen={isOpen} setIsOpen={setIsOpen} {...createRoom} />
            )}
        </>
    );
};

export default CreateRoomPage;