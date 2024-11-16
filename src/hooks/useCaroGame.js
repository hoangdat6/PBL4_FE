import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setBoard } from "../store/slices/RoomSlice";
import {SEND_MOVE} from "../constants/socketEndpoint";

export const useCaroGame = (roomCode, sendMove) => {
    const playerId = useSelector((state) => state.auth.userId);
    const { lastMove, startPlayerId, nthMove, boardState, participantType, roomConfig } = useSelector((state) => state.room);
    const dispatch = useDispatch();

    const isTurn = (playerId === startPlayerId && nthMove % 2 === 0) || (playerId !== startPlayerId && nthMove % 2 === 1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(isTurn);
    const [nthMoveState, setNthMoveState] = useState(nthMove);
    const isPlayerStart = playerId === startPlayerId;

    useEffect(() => {
        setIsPlayerTurn(isTurn);
    }, [startPlayerId, nthMove, playerId]);

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
        };
        sendMove(SEND_MOVE(roomCode), move);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        if (lastMove) {
            const { row, col, nthMove } = lastMove;
            console.log(lastMove);
            const updatedBoard = boardState.board.map((r, rIndex) => {
                if (rIndex === row) {
                    return r.map((c, cIndex) => (cIndex === col ? nthMove % 2 : c));
                }
                return r;
            });
            setNewBoard(updatedBoard);
            setIsPlayerTurn(!((nthMove % 2 === 0 && playerId === startPlayerId) || (nthMove % 2 === 1 && playerId !== startPlayerId)));
            setNthMoveState(nthMove + 1);
        }
    }, [lastMove]);

    return { board: boardState.board, handleClick, isPlayerTurn, isPlayerStart, roomConfig, participantType, lastMove };
};