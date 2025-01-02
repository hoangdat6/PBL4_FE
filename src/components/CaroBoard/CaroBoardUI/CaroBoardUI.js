import React, { useState } from "react";
import styles from "./CaroBoardUI.module.scss";
import Checker3 from "../../../assets/statics/imgs/checker3.svg";
import Checker4 from "../../../assets/statics/imgs/checker4.svg";
import Star from "../../../assets/statics/imgs/star.svg";

const CaroBoardUI = ({ board, handleClick, isStartPlayer, isPlayer, isPlayerTurn, lastMove, winningCells }) => {
    const [hoveredCell, setHoveredCell] = useState(null);

    board = board || Array(16).fill().map(() => Array(16).fill(-1));

    const checkWinningCell = (row, col) => {
        if (!winningCells) {
            return false;
        }

        return winningCells.some((cell) => cell.row === row && cell.col === col);
    }

    return (
        <div className={styles.table_wrapper}>
            <table className={styles.boardTableAfter}>
                <tbody>
                {board && board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex} className={`${styles.boardCell} `}>
                                {/* Existing cells */}
                            </td>
                        ))}
                        <td key={`${rowIndex}-extra`} className={`${styles.boardCell} `}>
                            {/* Extra cell */}
                        </td>
                    </tr>
                ))}
                <tr>
                    {board[0] && board[0].map((cell, colIndex) => (
                        <td key={colIndex} className={`${styles.boardCell} `}>
                            {/* Existing cells */}
                        </td>
                    ))}
                    <td key="extra" className={`${styles.boardCell} `}>
                        {/* Extra cell */}
                    </td>
                </tr>
                </tbody>
            </table>
            <table className={styles.boardTable}>
                <tbody>
                {board && board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}
                                className={`${styles.boardCell} `}
                            >
                                <button
                                    className={`
                                        ${styles.boardButton} 
                                        ${lastMove?.row === rowIndex && lastMove?.col === colIndex ? styles.lastClicked : ''}
                                        ${checkWinningCell(rowIndex, colIndex) ? styles.winningCell : ''}
                                        `
                                }

                                    onClick={
                                        () => handleClick(rowIndex, colIndex)
                                    }

                                    {
                                        ...((!isPlayer || !isPlayerTurn) && {disabled: true})
                                    }

                                    onMouseEnter={() => {
                                        if (isPlayer) {
                                            setHoveredCell({rowIndex, colIndex});
                                        }
                                    }}

                                    onMouseLeave={() => {
                                        if(isPlayer) {
                                            setHoveredCell(null);
                                        }
                                    }}
                                >
                                    {/* Hiển thị icon nếu ô đã được đánh */}
                                    {
                                        cell !== -1 ?
                                            (cell === 0 ?
                                                <img src={Checker4} alt="checker"/> :
                                                <img src={Checker3} alt="checker"/>) :
                                            ""}

                                    {/* Hiển thị icon nếu đang hover */}
                                    {isPlayer && hoveredCell?.rowIndex === rowIndex && hoveredCell?.colIndex === colIndex && cell === -1 ? (
                                        isStartPlayer ?
                                            <img src={Checker4} alt="checker"/> :
                                            <img src={Checker3} alt="checker"/>
                                    ) : (
                                        ""
                                    )}

                                    {checkWinningCell(rowIndex, colIndex) && <img src={Star} alt="Star" className={styles.star} />}

                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default CaroBoardUI;
