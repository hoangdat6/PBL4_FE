import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomService from "../services/gameBot.service";
import showLeaveRoomPopup from "../components/showLeaveRoomPopup/showLeaveRoomPopup";
import GameBot from "../services/gameBot.service";
import BoardUtils from "../utils/BoardUtils";

const useGameBot = () => {
    const { roomCode: roomCodeURL } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [isFirstPlayer, setIsFirstPlayer] = useState(true);
    const [player, setPlayer] = useState(null);
    const [roomCode, setRoomCode] = useState(roomCodeURL || null);
    const [board, setBoard] = useState(Array.from({ length: 16 }, () => Array(16).fill(-1)));
    const [nthMoveState, setNthMoveState] = useState(0);
    const [winnerId, setWinnerId] = useState(null);
    const [lastMove, setLastMove] = useState(null);
    const [showResult, setShowResult] = useState(false); // Trạng thái để kiểm soát hiển thị trang kết quả
    const [isEndGame, setIsEndGame] = useState(false);
    const [isRoomNotFound, setIsRoomNotFound] = useState(false);
    const [winningCells, setWinningCells] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (roomCode) {
            joinRoom(roomCode);
        }
    }, [roomCode]);

    const createRoom = () => {
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
                    const { playerId, playerName, playerAvatar, lastMove, board, nthMove, playerTurn } = response.data;

                    setPlayer({
                        id: playerId,
                        name: playerName,
                        avatar: playerAvatar,
                    });

                    setLastMove(lastMove);
                    setBoard(BoardUtils.parseBoard(board));
                    setNthMoveState(nthMove);
                    setIsPlayerTurn(playerTurn);

                    setTimeout(() => {
                        setIsPlaying(true);
                    }, 1000);
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setIsRoomNotFound(true);
                }
            });
    };

    const handleClick = (row, col) => {
        if (board[row][col] === -1 && isPlayerTurn) {
            const move = { row, col };
            addMoveToBoard(move, nthMoveState % 2);
            setNthMoveState((prev) => prev + 1); // Cập nhật số bước đi
            setIsPlayerTurn(false);
            setLastMove(move)

            RoomService.sendMove(roomCode, move)
                .then((res) => {
                    const { win, row, col } = res.data;

                    if (win) {
                        setWinnerId(-1);
                        setIsEndGame(true);
                    }

                    if (row !== -1 && col !== -1) {
                        addMoveToBoard(res.data, (nthMoveState + 1) % 2);
                        setLastMove(res.data)
                        setNthMoveState((prev) => prev + 1);
                        setIsPlayerTurn(true);
                    } else {
                        setWinnerId(player.id);
                        setIsEndGame(true);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        if(isEndGame) {
            setWinningCells(BoardUtils.getWinningCells(board).flat());
        }
    }, [isEndGame]);


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

    useEffect(() => {
        if (winnerId !== null) {
            setTimeout(() => {
                setShowResult(true);
            }, 4000);
        }
    }, [winnerId]);

    return {
        isPlayerTurn,
        isFirstPlayer,
        isPlaying,
        isEndGame,
        roomCode,
        board,
        lastMove,
        winnerId,
        player,
        showResult,
        isRoomNotFound,
        winningCells,
        handleClick,
        createRoom,
        joinRoom,
        leaveRoomWithPopup,
    };
};

export default useGameBot;