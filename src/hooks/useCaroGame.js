import { useState, useEffect } from 'react';
import {useSelector} from "react-redux";

export const useCaroGame = (roomCode, sendMove) => {
    const playerId = useSelector((state) => state.auth.userId);
    // kiểm tra xem lượt đi của người chơi hiện tại hay không
    const {lastMove, startPlayerId, nthMove, boardState, participantType, roomConfig}  = useSelector((state) => state.caroGame);

    const isTurn = (playerId === startPlayerId && nthMove % 2 === 0) || (playerId !== startPlayerId && nthMove % 2 === 1);
    const [board, setBoard] = useState(boardState.board);
    const [isPlayerTurn, setIsPlayerTurn] = useState(isTurn);
    const [cnt, setCnt] = useState(nthMove);

    const isPlayerStart = playerId === startPlayerId;

    // xử lý khi người chơi đánh vào một nước cờ
    const handleClick = (row, col) => {
        if (board[row][col] !== -1 || !isPlayerTurn) return;

        setCnt(cnt + 1);
        const newBoard = board.map((r, rIndex) => {
            if (rIndex === row) {
                return r.map((c, cIndex) => (cIndex === col ? cnt % 2 : c));
            }
            return r;
        });
        setBoard(newBoard);
        const move = {
            col,
            row,
            nthMove: cnt,
        };

        sendMove(`/app/move/${roomCode}` , move);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        if (lastMove) {
            const { row, col, nthMove, win} = lastMove;
            console.log(lastMove);
            const updatedBoard = board.map((r, rIndex) => {
                if (rIndex === row) {
                    return r.map((c, cIndex) => (cIndex === col ? nthMove % 2 : c));
                }
                return r;
            });
            setBoard(updatedBoard);
            setIsPlayerTurn(!((nthMove % 2 === 0 && playerId === startPlayerId) || (nthMove % 2 === 1 && playerId !== startPlayerId)))
            setCnt(nthMove + 1);

            if(win === true) {
                if((playerId === startPlayerId && nthMove % 2 === 1) || (playerId !== startPlayerId && nthMove % 2 === 0)) {
                    alert("You lose");
                }else {
                    alert("You win");
                }
            }

        }
    }, [lastMove]);


    return { board, handleClick, isPlayerTurn, isPlayerStart, roomConfig, participantType };
};


