import Leaderboard from "../../components/Leaderboard/Leaderboard";
import LeaderBoardService from "../../services/leaderBoard.service";
import React, {useEffect, useState} from "react";

import styles from "./LeaderboardPage.module.scss";


const LeaderboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [rankings, setRankings] = useState("Challenger");

    const playersPerPage = 10;

    const handlePrevious = () => {
        if (currentPage > 1) {
            handleGetLeaderboard(currentPage - 1, playersPerPage, rankings);
            setCurrentPage((prevState) => prevState - 1);
        }
    };

    const handleNext = () => {
        if (currentPage <= totalPages) {
            handleGetLeaderboard(currentPage + 1, playersPerPage, rankings);
            setCurrentPage((prevState) => prevState + 1);
        }
    };

    const handleGetLeaderboard = (page, pageSize = 10, rankings = "Challenger") => {
        LeaderBoardService.getLeaderBoard(page, pageSize, rankings).then((response) => {
            const {
                leaderboard, totalPages
            } = response.data;

            setCurrentPlayers(leaderboard);
            setTotalPages(totalPages);

            setLoading(false);
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            handleGetLeaderboard(currentPage, playersPerPage);
            setLoading(false);
        }, 1000);
    }, []);

    const handleRankings = (rankings) => {
        setRankings(rankings);
        handleGetLeaderboard(currentPage, playersPerPage, rankings);
    }

    return (
        <div className={styles.rankingTableContainer}>
            <h2 className={styles.title}>Bảng xếp hạng</h2>
            <div className={styles.rankings}>
                <div>
                    <button className={`${styles.rankingsButton} ${rankings === "Rookie" ? styles.active : ""}`}
                            onClick={() => handleRankings("Rookie")}
                    >Rookie</button>
                </div>
                <div>
                    <button className={`${styles.rankingsButton} ${rankings === "Professional" ? styles.active : ""}`}
                            onClick={() => handleRankings("Professional")}
                    >Professional</button>
                </div>
                <div>
                    <button className={`${styles.rankingsButton} ${rankings === "Master" ? styles.active : ""}`}
                            onClick={() => handleRankings("Master")}
                    >Master</button>
                </div>
                <div>
                    <button className={`${styles.rankingsButton} ${rankings === "Challenger" ? styles.active : ""}`}
                            onClick={() => handleRankings("Challenger")}
                    >Challenger</button>
                </div>
            </div>
            <Leaderboard
                loading={loading}
                currentPlayers={currentPlayers}
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                playersPerPage={playersPerPage}
                error={error}
            />
        </div>
    )
}

export default LeaderboardPage;