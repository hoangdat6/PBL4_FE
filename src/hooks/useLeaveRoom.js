import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

const useLeaveRoom = (stompClient, roomCode) => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);
    console.log('userId:', userId);

    const leaveRoom = async () => {
        await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/leave`, null, {
            params: {
                playerId: userId,
            }
        }).then((response) => {
            console.log('Room left:', response.data.roomCode);
            navigate('/');
        }).catch((error) => {
            if (error.response) {
                console.error('Error leaving room:', error.response.data);
            } else {
                console.error('Error leaving room:', error.message);
            }
        });
    }

    const handleLeaveRoom = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
        }
        leaveRoom().then(() => {
            console.log('Room left successfully.');
        });
    };

    return {handleLeaveRoom};
};

export default useLeaveRoom;