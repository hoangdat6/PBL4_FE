import React, { useState } from "react";
import styles from "./CaroBoardUI.module.scss";
import Checker3 from "../../../assets/statics/imgs/checker3.svg";
import Checker4 from "../../../assets/statics/imgs/checker4.svg";

const CaroBoardUI = ({ board, handleClick }) => {
    const [hoveredCell, setHoveredCell] = useState(null); // State để theo dõi ô đang hover

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
                                onMouseEnter={() => setHoveredCell({ rowIndex, colIndex })} // Set ô đang hover
                                onMouseLeave={() => setHoveredCell(null)} // Reset khi rời khỏi ô
                            >
                                {/* Hiển thị icon nếu đang hover */}
                                {hoveredCell?.rowIndex === rowIndex && hoveredCell?.colIndex === colIndex ? (
                                    <img src={cell === 0 ? Checker3 : Checker4} alt="checker" />
                                ) : (
                                    (cell !== -1 ? (cell === 0 ?
                                        <img src={Checker3} alt="checker" /> :
                                        <img src={Checker4}/>
                                        ) : "")
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
