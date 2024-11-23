import useLeaveRoom from "./useLeaveRoom";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setPlayingRoom} from "../store/slices/userPlaySlice";

const useConflictRoom = () => {
    const playingRoom = useSelector((state) => state.user.playingRoom);
    const { leaveRoomNotPopup } = useLeaveRoom();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const continuePlayCurrentRoom = () => {
        dispatch(setPlayingRoom(null));
        leaveRoomNotPopup();
    };

    const continuePlay = () => {
        navigate(`/room/${playingRoom}`);
        window.location.reload();
    };

    return {
        conflictRoomCode : playingRoom,
        continuePlayCurrentRoom,
        continuePlay,
    };
};

export default useConflictRoom;