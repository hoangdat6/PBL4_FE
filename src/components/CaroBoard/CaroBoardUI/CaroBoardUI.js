import React, { useState } from "react";
import styles from "./CaroBoardUI.module.scss";
import Checker3 from "../../../assets/statics/imgs/checker3.svg";
import Checker4 from "../../../assets/statics/imgs/checker4.svg";
import ParticipantType from "../../../enums/participantType";
import {useSelector} from "react-redux";

const CaroBoardUI = ({ board, handleClick, isStartPlayer, participantType, isPlayerTurn }) => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const { lastMove } = useSelector((state) => state.game);
    return (
        <div className={styles.table_wrapper}>
            <table className={styles.boardTableAfter}>
                <tbody>
                {board.map((row, rowIndex) => (
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
                    {board[0].map((cell, colIndex) => (
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
                {board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}
                                className={`${styles.boardCell} `}>
                                <button
                                    className={`${styles.boardButton} ${lastMove?.row === rowIndex && lastMove?.col === colIndex ? styles.lastClicked : ''}`}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                {...((participantType === ParticipantType.SPECTATOR || !isPlayerTurn) && {disabled: true})}
                                onMouseEnter={() => {
                                    if (participantType !== ParticipantType.SPECTATOR) {
                                        setHoveredCell({rowIndex, colIndex});
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (participantType !== ParticipantType.SPECTATOR) {
                                        setHoveredCell(null);
                                    }
                                }}
                            >
                                {/* Hiển thị icon nếu ô đã được đánh */}
                                {cell !== -1 ? (cell === 0 ? <img src={Checker4} alt="checker"/> :
                                    <img src={Checker3} alt="checker"/>) : ""}

                                {/* Hiển thị icon nếu đang hover */}
                                {participantType === ParticipantType.PLAYER && hoveredCell?.rowIndex === rowIndex && hoveredCell?.colIndex === colIndex && cell === -1 ? (
                                    isStartPlayer ? <img src={Checker4} alt="checker"/> :
                                        <img src={Checker3} alt="checker"/>
                                ) : (
                                    ""
                                )}
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
