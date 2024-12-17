import JoinRoomResponse from "../models/JoinRoomResponse";
import {useState} from "react";
import axios from "axios";
import RoomService from "../services/room.service";


const useJoinRoom = () => {
    const [joinRoomState, setJoinRoomState] = useState(new JoinRoomResponse());

    const joinRoom = async (roomCode) => {
        return RoomService.joinRoom(roomCode);
    }


    return { joinRoom, joinRoomState, setJoinRoomState };
}

export default useJoinRoom;