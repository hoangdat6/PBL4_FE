import { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

export const useCaroGame = (roomCode, sendMove) => {
    const playerId = useSelector((state) => state.auth.userId);
    // kiểm tra xem lượt đi của người chơi hiện tại hay không
    const {lastMove, startPlayerId, nthMove, boardState, participantType, roomConfig, playerId1, playerId2}  = useSelector((state) => state.caroGame);
    // kiêm tra xem người chơi hiện tại có phải là người bắt đầu không
    const isTurn = (playerId === startPlayerId && nthMove % 2 === 0) || (playerId !== startPlayerId && nthMove % 2 === 1);
    // khởi tạo bàn cờ
    const [board, setBoard] = useState(boardState.board);
    // state quản lý đến lượt người chơi hay không
    const [isPlayerTurn, setIsPlayerTurn] = useState(isTurn);
    const [nthMoveState, setNthMoveState] = useState(nthMove);
    const isPlayerStart = playerId === startPlayerId;
    const [playersInfo, setPlayersInfo] = useState(null);



    // xử lý khi người chơi đánh vào một nước cờ
    const handleClick = (row, col) => {
        if (board[row][col] !== -1 || !isPlayerTurn) return;

        setNthMoveState(nthMoveState + 1);
        const newBoard = board.map((r, rIndex) => {
            if (rIndex === row) {
                return r.map((c, cIndex) => (cIndex === col ? nthMoveState % 2 : c));
            }
            return r;
        });
        setBoard(newBoard);
        const move = {
            col,
            row,
            nthMove: nthMoveState,
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
            setNthMoveState(nthMove + 1);

            if(win === true) {
                if((playerId === startPlayerId && nthMove % 2 === 1) || (playerId !== startPlayerId && nthMove % 2 === 0)) {
                    alert("You lose");
                }else {
                    alert("You win");
                }
            }

        }
    }, [lastMove]);

    const getInfoUsers = async () => {
        await axios(`${process.env.REACT_APP_CARO_BE_API_URL}/user/getUsers`, {}, {
            playerId1: playerId1,
            playerId2: playerId2,
        }).then((response) => {
            setPlayersInfo(response.data);
        }).catch((error) => {
            throw error;
        })
    }

    getInfoUsers();

    return { board, handleClick, isPlayerTurn, isPlayerStart, roomConfig, participantType, playersInfo };
};


