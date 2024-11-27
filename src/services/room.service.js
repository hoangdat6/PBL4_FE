import axios from "axios";
import apiClient from "./apiClient";
const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/room/`;

const createRoom = async (configGameDTO) => {
    return await apiClient(API_URL).post('/create', configGameDTO);
}

const joinRoom = async (roomCode) => {
    return await apiClient(API_URL).post('/join', { }, { params: { roomCode } });
}

const getRoom = async (roomCode)     => {
    return await apiClient(API_URL).get(`/${roomCode}`);
}

const leaveRoom = async () => {
    return await apiClient(API_URL).post('/leave');
}

const RoomService = {
    createRoom,
    joinRoom,
    getRoom,
    leaveRoom,
}

export default RoomService;
