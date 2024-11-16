import { useNavigate } from "react-router-dom";
import RoomService from "../services/room.service";
import showLeaveRoomPopup from "../components/showLeaveRoomPopup/showLeaveRoomPopup";
import {useState} from "react";

const useLeaveRoom = () => {
    const [isLeaving, setIsLeaving] = useState(false);
    const navigate = useNavigate();

    const leaveRoom = async () => {
        RoomService.leaveRoom().then((response) => {
            navigate('/');
        }).catch((error) => {
            console.error('Error leaving room:', error.response.data);
        });
    };

    const leaveRoomHandler = () => {
        setIsLeaving(true);
        showLeaveRoomPopup(leaveRoom);
    }

    return {leaveRoom, leaveRoomHandler, isLeaving};
};

export default useLeaveRoom;
