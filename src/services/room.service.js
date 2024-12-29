import apiClient from "./apiClient";
const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/room/`;

const createRoom = async (configGameDTO) => {
    /**
     * configGameDTO: {
         moveDuration
         totalTime
         firstMoveOption
     * }
     *
     * Return: {
     *  "roomCode": "string"
     * }
     */
    return await apiClient(API_URL).post('/create', configGameDTO);
}

const joinRoom = async (roomCode) => {
    /**
     * roomCode: string
     *
     */
    return await apiClient(API_URL).post('/join', { }, { params: { roomCode } });
}


const leaveRoom = async () => {
    return await apiClient(API_URL).post('/leave');
}

const RoomService = {
    createRoom,
    joinRoom,
    leaveRoom,
}

export default RoomService;
