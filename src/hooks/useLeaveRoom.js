import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const useLeaveRoom = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);

    const leaveRoom = async (stompClient, roomCode) => {
        // Kiểm tra và đóng kết nối WebSocket nếu có
        if (stompClient && stompClient.current) {
            stompClient.current.deactivate();
        }

        // Gọi API rời phòng
        try {
            await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/leave`, null, {
                params: {
                    playerId: userId,
                }
            });
            navigate('/'); // Điều hướng về trang chính sau khi rời phòng thành công
        } catch (error) {
            if (error.response) {
                console.error('Error leaving room:', error.response.data);
            } else {
                console.error('Error leaving room:', error.message);
            }
        }
    };

    return leaveRoom;
};

export default useLeaveRoom;
