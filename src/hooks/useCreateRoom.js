import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import ConfigGameDTO from "../models/ConfigRoom";
import {FirstMoveOption} from "../enums/FirstMoveOption";
import {setRoomConflict} from "../store/slices/RoomSlice";
import RoomService from "../services/room.service";
import PrivateRoute from "../components/PrivateRoute";

const useCreateRoom = () => {
    const [turnTime, setTurnTime] = useState(40);
    const [totalTime, setTotalTime] = useState(5);
    const [firstPlayer, setFirstPlayer] = useState(FirstMoveOption.RANDOM);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateRoom = async () => {
        const configRoom = new ConfigGameDTO(turnTime, totalTime, firstPlayer);

        RoomService.createRoom(configRoom).then((response) => {
            console.log(response.data);
            navigate(`/room/${response.data.roomCode}`);
        }).catch((error) => {

            switch (error.response.status) {
                case 400:
                    console.log("Bad request");
                    break;
                case 401:
                    <PrivateRoute />;
                    break;
                case 403:
                    console.log("Forbidden");
                    break;
                case 404:
                    console.log("Not found");
                    break;
                case 409:
                    dispatch(setRoomConflict(error.response.data.roomCode));
                    break;
                default:
                    console.log("Unknown error");
                    break;
            }
        });
    };

    return { turnTime, setTurnTime, totalTime, setTotalTime, firstPlayer, setFirstPlayer, handleCreateRoom };
}

export default useCreateRoom;