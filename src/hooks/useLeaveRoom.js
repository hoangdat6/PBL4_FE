import {useNavigate} from "react-router-dom";
import RoomService from "../services/room.service";
import showLeaveRoomPopup from "../components/showLeaveRoomPopup/showLeaveRoomPopup";
import {resetGame} from "../store/slices/gameSlice";
import {useDispatch} from "react-redux";
import {resetRoom} from "../store/slices/roomSlice";

const useLeaveRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const leaveRoomNotPopup = async (redirectURL) => {
        redirectURL = redirectURL || "/";
        return RoomService.leaveRoom().then(() => {
            navigate(redirectURL || "/");
            dispatch(resetGame());
            dispatch(resetRoom());
        }).catch((error) => {
            console.log(error);
        });
    };

    const leaveRoomWithPopup = () => {
        showLeaveRoomPopup(leaveRoomNotPopup);
    }

    return {leaveRoomNotPopup, leaveRoomWithPopup};
};

export default useLeaveRoom;
