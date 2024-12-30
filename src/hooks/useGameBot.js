import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomService from "../services/gameBot.service";
import {resetGame} from "../store/slices/gameSlice";
import {resetRoom} from "../store/slices/roomSlice";
import showLeaveRoomPopup from "../components/showLeaveRoomPopup/showLeaveRoomPopup";
import GameBot from "../services/gameBot.service";

const useGameBot = () => {
    const { roomCode: roomCodeURL } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [isPlayerStart, setIsPlayerStart] = useState(true);
    const [isPlayer, setIsPlayer] = useState(true);
    const [roomCode, setRoomCode] = useState(roomCodeURL || null);
    const [board, setBoard] = useState(Array.from({ length: 16 }, () => Array(16).fill(-1)));
    const [nthMoveState, setNthMoveState] = useState(0);
    const [winnerId, setWinnerId] = useState(null);
    const [lastMove, setLastMove] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        console.log("roomCode", roomCode);
        if (roomCode) {
            joinRoom(roomCode);
        }
    }, [roomCode]);

    const createRoom = () => {
        console.log("createRoom");
        RoomService.createRoom()
            .then((response) => {
                if (response.data) {
                    navigate(`/b/room/${response.data}`, { replace: true });
                    setRoomCode(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const joinRoom = (roomCode) => {
        RoomService.joinRoom(roomCode)
            .then((response) => {
                if (response.data) {
                    setTimeout(() => {
                        setIsPlaying(true);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleClick = (row, col) => {
        if (isPlayer && board[row][col] === -1 && isPlayerTurn) {
            const move = { row, col };
            addMoveToBoard(move, nthMoveState % 2);
            setNthMoveState((prev) => prev + 1); // Cập nhật số bước đi
            setIsPlayerTurn(false);
            setLastMove(move)

            RoomService.sendMove(roomCode, move)
                .then((res) => {
                    addMoveToBoard(res.data, (nthMoveState + 1) % 2);
                    setLastMove(res.data)
                    setNthMoveState((prev) => prev + 1);
                    setIsPlayerTurn(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    const addMoveToBoard = (move, playerTurn) => {
        setBoard((prevBoard) =>
            prevBoard.map((r, rIndex) =>
                rIndex === move.row
                    ? r.map((c, cIndex) => (cIndex === move.col ? playerTurn : c))
                    : r
            )
        );
    };

    const leaveRoomNotPopup = async () => {
        return GameBot.leaveRoom(roomCode).then(() => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    const leaveRoomWithPopup = () => {
        showLeaveRoomPopup(leaveRoomNotPopup);
    }

    return {
        isPlayerTurn,
        isPlayerStart,
        isPlayer,
        isPlaying,
        roomCode,
        board,
        lastMove,
        winnerId,
        handleClick,
        createRoom,
        joinRoom,
        leaveRoomWithPopup,
    };
};

export default useGameBot;