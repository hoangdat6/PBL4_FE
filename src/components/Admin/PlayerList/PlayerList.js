import React from "react";
import styles from "./PlayerList.module.scss";
import Loading from "../../Loading/Loading";
import DefaultAvatar from "../../../assets/statics/default_avatar/Glowface.png";
import PlayerProfile from "../../PlayerProfile/PlayerProfile";
import useProfile from "../../../pages/Profile/UseProfile";

const PlayerList = ({
                        currentPlayers,
                        currentPage,
                        totalPages,
                        handleNext,
                        handlePrevious,
                        playersPerPage,
                        loading,
                    }) => {
    const { playerProfile, isLoading, isShowProfile, showProfile, hideProfile } = useProfile();
    if (loading) {
        return <Loading />;
    }

    return (

        <div className={styles.container}>
            <PlayerProfile
                playerProfile={playerProfile}
                isLoading={isLoading}
                isShowProfile={isShowProfile}
                toggleShowProfile={hideProfile}
            />
            <div className={styles.rankingTableWrapper}>
                <table className={styles.rankingTable}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Người chơi</th>
                        <th>Email</th>
                        <th>Số trận đã chơi</th>
                        <th>Profile</th>
                        <th>Cảnh báo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPlayers && currentPlayers.length > 0 ? (
                        currentPlayers.map((player, index) => (
                            <tr key={index}>
                                <td>
                                    {(index + 1) + (currentPage - 1) * playersPerPage}
                                </td>
                                <td className={styles.playerInfo}>
                                    <div className={styles.img_wrapper}>
                                        <img
                                            src={player.avatar || DefaultAvatar}
                                            alt="avatar"
                                            className={styles.avatar}
                                        />
                                    </div>
                                    <span className={styles.name}>{player.name}</span>
                                </td>
                                <td>{player.email}</td>
                                <td>{player.match} trận</td>
                                <td>
                                    <button className={styles.profile_button}
                                            onClick={() => {
                                                showProfile(player.id);
                                            }}
                                    >
                                        Xem Profile
                                    </button>
                                </td>
                                <td>
                                    <button className={styles.warning_button}>
                                        Cảnh báo
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className={styles.no_data}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
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
        </div>
    );
};

export default PlayerList;
