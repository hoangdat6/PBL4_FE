import JoinRoomResponse from "../models/JoinRoomResponse";
import {useState} from "react";
import axios from "axios";
import {setParticipantType} from "../store/slices/RoomSlice";


const useJoinRoom = () => {
    const [joinRoomState, setJoinRoomState] = useState(new JoinRoomResponse());

    const joinRoom = async (roomCode, playerId) => {
        return await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/join`, null, {
            params: {
                roomCode: roomCode,
                playerId: playerId,
            }
        })
    }

    return { joinRoom, joinRoomState, setJoinRoomState };
}

export default useJoinRoom;