import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ConfigGameDTO from "../models/ConfigRoom";
import axios from "axios";
import {FirstMoveOption} from "../enums/FirstMoveOption";


const useCreateRoom = () => {
    const [turnTime, setTurnTime] = useState(40);
    const [totalTime, setTotalTime] = useState(300);
    const [firstPlayer, setFirstPlayer] = useState(FirstMoveOption.RANDOM);
    const navigate = useNavigate();
    const playerId = useSelector((state) => state.auth.userId);

    const handleCreateRoom = async () => {
        const configRoom = new ConfigGameDTO(playerId, turnTime, totalTime, firstPlayer);
        await axios.post(`${process.env.REACT_APP_CARO_BE_API_URL}/api/room/create`, configRoom)
            .then((response) => {
                console.log(response.data);
                navigate(`/room/${response.data.roomCode}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return { turnTime, setTurnTime, totalTime, setTotalTime, firstPlayer, setFirstPlayer, handleCreateRoom };
}

export default useCreateRoom;