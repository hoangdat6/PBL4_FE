import React, { useState } from "react";
import styles from "./CaroBoardUI.module.scss";
import Checker3 from "../../../assets/statics/imgs/checker3.svg";
import Checker4 from "../../../assets/statics/imgs/checker4.svg";
import ParticipantType from "../../../enums/participantType";

const CaroBoardUI = ({ board, handleClick, isStartPlayer, participantType, sendMove }) => {
    const [hoveredCell, setHoveredCell] = useState(null);

    console.log(participantType)
    return (
        <table className={styles.boardTable}>
            <tbody>
            {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <td key={colIndex} className={styles.boardCell}>
                            <button
                                className={styles.boardButton}
                                onClick={() => handleClick(rowIndex, colIndex)}
                                {...(participantType === ParticipantType.SPECTATOR && { disabled: true })}
                                onMouseEnter={() => {
                                    if (participantType !== ParticipantType.SPECTATOR) {
                                        setHoveredCell({ rowIndex, colIndex });
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (participantType !== ParticipantType.SPECTATOR) {
                                        setHoveredCell(null);
                                    }
                                }}
                            >
                                {/* Hiển thị icon nếu ô đã được đánh */}
                                {cell !== -1 ? (cell === 0 ? <img src={Checker4} alt="checker" /> : <img src={Checker3} alt="checker" />) : ""}

                                {/* Hiển thị icon nếu đang hover */}

                                {participantType === ParticipantType.PLAYER && hoveredCell?.rowIndex === rowIndex && hoveredCell?.colIndex === colIndex && cell === -1 ? (
                                    isStartPlayer ? <img src={Checker4} alt="checker" /> : <img src={Checker3} alt="checker" />
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
    );
};

export default CaroBoardUI;
