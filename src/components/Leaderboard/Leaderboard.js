import React, { useState } from "react";
import styles from "./Leaderboard.module.scss";
import Loading from "../Loading/Loading";

const Leaderboard = ({ data, onGetLeaderboard, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;

    // Tính toán index bắt đầu và kết thúc cho mỗi trang
    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    const currentPlayers = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / playersPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onGetLeaderboard(currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onGetLeaderboard(currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <table className={styles.rankingTable}>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Người chơi</th>
                    <th>Thắng / Thua / Hòa</th>
                    <th>Chuỗi thắng</th>
                    <th>Thời gian chơi</th>
                    <th>Điểm</th>
                </tr>
                </thead>
                <tbody>
                {currentPlayers.map((player, index) => (
                    <tr key={index}>
                        <td>{player.rank}</td>
                        <td className={styles.playerInfo}>
                            <div className={styles.img_wrapper}>
                                <img
                                    src={player.avatar}
                                    alt="avatar"
                                    className={styles.avatar}
                                />
                            </div>
                            <a className={styles.name}>
                                {player.name}
                            </a>
                        </td>
                        <td>
                            <span className={styles.win}>{player.wins}</span> /{" "}
                            <span className={styles.lose}>{player.losses}</span> /{" "}
                            <span className={styles.draw}>{player.draws}</span>
                        </td>
                        <td>{player.streak} trận</td>
                        <td>{player.playTime}</td>
                        <td>{player.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {
                data.length === 0 ? (
                    <div className={styles.noData}>Không có dữ liệu</div>
                ) : (
                    <div className={styles.pagination}>
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className={styles.pageButton}
                        >
                            Previous
                        </button>
                        <span className={styles.pageInfo}>
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={styles.pageButton}
                        >
                            Next
                        </button>
                    </div>
                )
            }
        </>
    );
};

export default Leaderboard;
