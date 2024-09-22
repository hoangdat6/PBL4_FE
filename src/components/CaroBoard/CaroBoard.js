import React, {useEffect, useState} from 'react';
import styles from './CaroBoard.module.scss';
import useWebSocket from "../../hooks/useWebSocket";

const CaroBoard = () => {
    const [roomId, setRoomId] = useState("room_1");
    const [board, setBoard] = useState(Array(15).fill().map(() => Array(15).fill(-1)));  // Khởi tạo board với 15x15 ô, mỗi ô có giá trị -1
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const { sendMessage, lastMessage } = useWebSocket(`http://localhost:8080/game?roomId=${roomId}`);
    const [cnt, setCnt] = useState(0);

    const handleClick = (row, col) => {
        console.log(`Clicked on row: ${row}, col: ${col}`);

        if(board[row][col] !== -1) {
            console.log("Cell is already checked");
            return;
        }

        if(!isPlayerTurn) {
            return;
        }

        setCnt(cnt + 1);
        const newBoard = board.map((r, rIndex) => {
            if(rIndex === row) {
                return r.map((c, cIndex) => {
                    if(cIndex === col) {
                        return cnt % 2;
                    }
                    return c;
                });
            }
            return r;
        });
        setBoard(newBoard);

        sendMessage({
            row,
            col,
            cnt
        });
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
            setIsPlayerTurn(true);  // Sau khi nhận thông tin từ server, lượt sẽ quay lại cho người chơi
        }
    }, [lastMessage]);


    return (
        <section className={styles.boardSection}>
            <table className={styles.boardTable}>
                <tbody>
                {board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex} className={styles.boardCell}>
                                <button
                                    className={styles.boardButton}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                >
                                    {cell !== -1 ? cell === 0 ? "O" : "X" : ""}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default CaroBoard;
