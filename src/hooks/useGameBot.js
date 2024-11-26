import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import RoomService from "../services/gameBot.service";

const useGameBot = () => {
    const roomCodeURL = useParams().roomCode;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [isPlayerStart, setIsPlayerStart] = useState(true);
    const [isPlayer, setIsPlayer] = useState(true);
    const [roomCode, setRoomCode] = useState(roomCodeURL || null);
    const [board, setBoard] = useState(Array(16).fill(Array(16).fill(-1)));
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});

    const navigate = useNavigate();

    const createRoom = () => {
        RoomService.createRoom().then((response) => {
            if (response.data) {
                navigate(`/b/room/${response.data}`, { replace: true });
                joinRoom(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const joinRoom = (roomCode) => {
        RoomService.joinRoom(roomCode).then((response) => {
            if (response.data) {
                setRoomCode(response.data);
                setIsPlaying(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleClick = (row, col) => {
        let newBoard = board.map((row) => row.slice());
        newBoard[row][col] = 1;
        setBoard(newBoard);
        setIsPlayerTurn(false);
    }

    return {
        isPlayerTurn,
        isPlayerStart,
        isPlayer,
        isPlaying,
        roomCode,
        board,
        player1,
        player2,
        handleClick,
        createRoom,
        joinRoom,
    };
}

export default useGameBot;