import { useState, useEffect } from 'react';

export const useCaroGame = (roomId, sendMessage, lastMessage) => {
    const [board, setBoard] = useState(Array(16).fill().map(() => Array(16).fill(-1)));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [cnt, setCnt] = useState(0);

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
        console.log("click", row, col, roomId);
        const move = {
            roomId: roomId,
            playerId: "1",
            x: col,
            y: row,
        };
        sendMessage('/app/move' , { move });
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        if (lastMessage) {
            const { row, col, cnt } = lastMessage;
            setCnt(cnt + 1);
            const updatedBoard = board.map((r, rIndex) => {
                if (rIndex === row) {
                    return r.map((c, cIndex) => (cIndex === col ? cnt % 2 : c));
                }
                return r;
            });
            setBoard(updatedBoard);
            setIsPlayerTurn(true);
        }
    }, [lastMessage]);

    const checkWin = (row, col) => {
        const check = (r, c, dr, dc) => {
            let cnt = 0;
            while (r >= 0 && r < 16 && c >= 0 && c < 16 && board[r][c] === board[row][col]) {
                cnt++;
                r += dr;
                c += dc;
            }
            return cnt;
        }

        const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1]
        ];

        for (let [dr, dc] of directions) {
            const cnt = check(row + dr, col + dc, dr, dc) + check(row - dr, col - dc, -dr, -dc) - 1;
            if (cnt >= 5) return true;
        }
        return false;
    }

    const handleHover = (row, col) => {
        
    }

    return { board, handleClick, isPlayerTurn };
};
