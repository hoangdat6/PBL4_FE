import React, { useState } from "react";
import styles from "./CaroBoardUI.module.scss";
import Checker3 from "../../../assets/statics/imgs/checker3.svg";
import Checker4 from "../../../assets/statics/imgs/checker4.svg";
import StarIcon from "../../../assets/statics/imgs/star.svg"; // Thêm icon sao vàng
import { useSelector } from "react-redux";

const CaroBoardUI = ({ board, handleClick, isStartPlayer, isPlayer, isPlayerTurn, lastMove, winningCells }) => {
    const [hoveredCell, setHoveredCell] = useState(null);

    board = board || Array(16).fill().map(() => Array(16).fill(-1));

    // console.log(winningCells);

    // const isWinningCell = (rowIndex, colIndex) => {
    //     return winningCells.some(cell => cell.row === rowIndex && cell.col === colIndex);
    // };

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
                                    className={`${styles.boardButton} ${lastMove?.row === rowIndex && lastMove?.col === colIndex ? styles.lastClicked : ''}`}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                    {...((!isPlayer || !isPlayerTurn) && { disabled: true })}
                                    onMouseEnter={() => {
                                        if (isPlayer) {
                                            setHoveredCell({ rowIndex, colIndex });
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (isPlayer) {
                                            setHoveredCell(null);
                                        }
                                    }}
                                >
                                    {/* Hiển thị icon nếu ô đã được đánh */}
                                    {cell !== -1 ? (cell === 0 ? <img src={Checker4} alt="checker" /> :
                                        <img src={Checker3} alt="checker" />) : ""}

                                    {/* Hiển thị icon nếu đang hover */}
                                    {isPlayer && hoveredCell?.rowIndex === rowIndex && hoveredCell?.colIndex === colIndex && cell === -1 ? (
                                        isStartPlayer ? <img src={Checker4} alt="checker" /> :
                                            <img src={Checker3} alt="checker" />
                                    ) : (
                                        ""
                                    )}

                                    {/*/!* Hiển thị icon sao vàng nếu ô nằm trong winningCells *!/*/}
                                    {/*{winningCells && winningCells !== [] && isWinningCell(rowIndex, colIndex) && (*/}
                                    {/*    <img src={StarIcon} alt="winning star" className={styles.winningStar} style={{ position: 'absolute', width: '15px', height: '15px' }} />*/}
                                    {/*)}*/}
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
