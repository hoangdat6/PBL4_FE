import axios from "axios";
import {useState} from "react";

const useJoinRoom = async (roomId, userId) => {
    const [roomCodeResponse, setRoomCode] = useState(null);

    console.log('Joining room:', roomId, userId);

    try {
        await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/join`, null, {
            params: {
                roomCode: roomId,
                playerId: userId,
            }
        }).then((response) => {
            console.log('Room joined:', response.data.roomCode);
            setRoomCode(response.data.roomCode);
        }).catch((error) => {
            if (error.response) {
                console.error('Error joining room:', error.response.data);
            } else {
                console.error('Error joining room:', error.message);
            }
            setRoomCode(null);
        });

    } catch (error) {
        console.error('Error joining room:', error);
    }

    return {roomCodeResponse};
}

export default useJoinRoom;