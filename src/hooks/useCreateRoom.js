import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PrivateRoute from "../components/PrivateRoute";
import ConfigGameDTO from "../models/ConfigRoom";
import {FirstMoveOption} from "../enums/FirstMoveOption";
import {setRoomCode} from "../store/slices/roomSlice";
import RoomService from "../services/room.service";
import {setCurrentRoom, setPlayingRoom} from "../store/slices/userPlaySlice";
import {setGameConfig} from "../store/slices/gameSlice";

const useCreateRoom = () => {
    const [moveDuration, setMoveDuration] = useState(40); // s
    const [totalTime, setTotalTime] = useState(5); // m
    const [firstPlayer, setFirstPlayer] = useState(FirstMoveOption.RANDOM);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateRoom = async () => {
        const configRoom = new ConfigGameDTO(moveDuration, totalTime * 60, firstPlayer);

        RoomService.createRoom(configRoom).then((response) => {
            navigate(`/room/${response.data.roomCode}`);
            dispatch(setGameConfig(response.data));
            dispatch(setCurrentRoom(response.data.roomCode));
            dispatch(setRoomCode(response.data.roomCode));
        }).catch((error) => {
            switch (error.response.status) {
                case 400:
                    console.log("Bad request");
                    break;
                case 401:
                    <PrivateRoute/>;
                    break;
                case 403:
                    console.log("Forbidden");
                    break;
                case 404:
                    console.log("Not found");
                    break;
                case 409:
                    dispatch(setPlayingRoom(error.response.data.roomCode));
                    break;
                default:
                    console.log("Unknown error");
                    break;
            }
        });
    };

    return { moveDuration, setMoveDuration, totalTime, setTotalTime, firstPlayer, setFirstPlayer, handleCreateRoom };
}

export default useCreateRoom;