import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ConfigGameDTO from "../models/ConfigRoom";
import axios from "axios";
import {FirstMoveOption} from "../enums/FirstMoveOption";
import {setRoomConflict} from "../store/slices/RoomSlice";


const useCreateRoom = () => {
    const [turnTime, setTurnTime] = useState(40);
    const [totalTime, setTotalTime] = useState(5);
    const [firstPlayer, setFirstPlayer] = useState(FirstMoveOption.RANDOM);
    const navigate = useNavigate();
    const playerId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();

    const handleCreateRoom = async () => {
        const configRoom = new ConfigGameDTO(playerId, turnTime, totalTime, firstPlayer);
        await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/create`, configRoom)
            .then((response) => {
                console.log(response.data);
                navigate(`/room/${response.data.roomCode}`);
            })
            .catch((error) => {
                console.error('Error creating room:', error.response.data.roomCode);
                dispatch(setRoomConflict(error.response.data.roomCode));
            });
    };

    return { turnTime, setTurnTime, totalTime, setTotalTime, firstPlayer, setFirstPlayer, handleCreateRoom };
}

export default useCreateRoom;