import React, {useState} from "react";
import styles from "./Leaderboard.module.scss";
import Loading from "../Loading/Loading";
import {getAvatarByName} from "../../utils/AvatarUtils";

const Leaderboard = ({
                         currentPlayers,
                         currentPage,
                         totalPages,
                         handleNext,
                         handlePrevious,
                         playersPerPage,
                         loading
                     }) => {

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.rankingTableWrapper}>
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
                    {currentPlayers && currentPlayers.map((player, index) => (
                        <tr key={index}>
                            <td>{player.rank + (currentPage - 1) * playersPerPage}</td>
                            <td className={styles.playerInfo}>
                                <div className={styles.img_wrapper}>
                                    <img
                                        src={getAvatarByName(player?.avatar)}
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
            </div>


            {/* Pagination Controls */}
            {
                currentPlayers.length === 0 ? (
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

        </div>
    );
};

export default Leaderboard;
