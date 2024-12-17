import axios from "axios";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/ai/`;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const createRoom = async (configGameDTO) => {
    return await apiClient.post('/create', configGameDTO);
}

const joinRoom = async (roomCode) => {
    return await apiClient.post('/join', { }, { params: { roomCode } });
}

const getRoom = async (roomCode) => {
    return await apiClient.get(`/${roomCode}`);
}

const leaveRoom = async () => {
    return await apiClient.post('/leave');
}

const sendMove = async (moveDTO) => {
    return await apiClient.post('/move', moveDTO);
}

const GameBot = {
    createRoom,
    joinRoom,
    getRoom,
    leaveRoom,
    sendMove,
}

export default GameBot;