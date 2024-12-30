import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setBoard, setIsPlayerTurn} from "../store/slices/gameSlice";
import {SEND_MOVE} from "../constants/socketEndpoint";
import {setIsTurn} from "../store/slices/roomSlice";

export const useCaroGame = (roomCode, sendMove) => {
    const dispatch = useDispatch();
    const playerId = useSelector((state) => state.auth.userId);
    const { participantType, roomConfig } = useSelector((state) => state.room);
    const {lastMove, startPlayerId, nthMove, boardState } = useSelector((state) => state.game);
    const isTurn = (playerId === startPlayerId && nthMove % 2 === 0) || (playerId !== startPlayerId && nthMove % 2 === 1);
    const { isPlayerTurn } = useSelector((state) => state.game);
    const [nthMoveState, setNthMoveState] = useState(nthMove);
    const isPlayerStart = playerId === startPlayerId;
    const [playerTurnId, setPlayerTurnId] = useState(null);

    const {id: id1} = useSelector((state) => state.room.player1Info);
    const {id: id2} = useSelector((state) => state.room.player2Info);

    useEffect(() => {
        console.log(isTurn);
        dispatch(setIsPlayerTurn(isTurn));
    }, [isTurn, dispatch]);

    useEffect(() => {
        if(startPlayerId && id1 && startPlayerId === id1) {
            if(nthMoveState % 2 === 0) {
                dispatch(setIsTurn(true));
                setPlayerTurnId(id2);
            }else {
                dispatch(setIsTurn(false));
                setPlayerTurnId(id1);
            }
        }else {
            if(nthMoveState % 2 === 0) {
                dispatch(setIsTurn(false));
                setPlayerTurnId(id1);
            }else {
                dispatch(setIsTurn(true));
                setPlayerTurnId(id2);
            }
        }

    }, [startPlayerId, nthMoveState]);


    const setNewBoard = (board) => {
        dispatch(setBoard(board));
    }

    const handleClick = (row, col) => {
        if (boardState.board[row][col] !== -1 || !isPlayerTurn) return;

        setNthMoveState(nthMoveState + 1);
        const newBoard = boardState.board.map((r, rIndex) => {
            if (rIndex === row) {
                return r.map((c, cIndex) => (cIndex === col ? nthMoveState % 2 : c));
            }
            return r;
        });
        setNewBoard(newBoard);

        const move = {
            col,
            row,
            nthMove: nthMoveState,
            playerTurnId
        };
        sendMove(SEND_MOVE(roomCode), move);
        dispatch(setIsPlayerTurn(false));
    };

    useEffect(() => {
        if (lastMove) {
            const { row, col, nthMove } = lastMove;
            const updatedBoard = boardState.board.map((r, rIndex) => {
                if (rIndex === row) {
                    return r.map((c, cIndex) => (cIndex === col ? nthMove % 2 : c));
                }
                return r;
            });
            setNewBoard(updatedBoard);
            dispatch(setIsPlayerTurn(!((nthMove % 2 === 0 && playerId === startPlayerId) || (nthMove % 2 === 1 && playerId !== startPlayerId))));
            setNthMoveState(nthMove + 1);
        }
    }, [lastMove]);

    const getWinningCells = (board) => {
        const directions = [
            { x: 1, y: 0 },  // Horizontal
            { x: 0, y: 1 },  // Vertical
            { x: 1, y: 1 },  // Diagonal down-right
            { x: 1, y: -1 }  // Diagonal up-right
        ];

        const isValidCell = (x, y) => x >= 0 && y >= 0 && x < board.length && y < board[0].length;

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] !== -1) {
                    for (let { x, y } of directions) {
                        const cells = [];
                        for (let i = 0; i < 5; i++) {
                            const newRow = row + i * y;
                            const newCol = col + i * x;
                            if (isValidCell(newRow, newCol) && board[newRow][newCol] === board[row][col]) {
                                cells.push({ row: newRow, col: newCol });
                            } else {
                                break;
                            }
                        }
                        if (cells.length === 5) {
                            return cells;
                        }
                    }
                }
            }
        }
        return [];
    };

    return { board: boardState.board, handleClick, isPlayerTurn, isPlayerStart, roomConfig, participantType, lastMove, getWinningCells };
};