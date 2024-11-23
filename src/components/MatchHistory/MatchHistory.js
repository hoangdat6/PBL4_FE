import React, {useState} from "react";
import HistoryCell from "./HistoryCell/HistoryCell";
import styles from "./MatchHistory.module.scss";

    const data = [
        {
            players: ["Alice", "Bob"],
            scores: [3, 2],
            game_count: 5,
            create_at: "2024-11-23 12:34",
        },
        {
            players: ["Charlie", "David"],
            scores: [1, 4],
            game_count: 7,
            create_at: "2024-11-22 15:45",
        },
        {
            players: ["Eve", "Frank"],
            scores: [2, 2],
            game_count: 6,
            create_at: "2024-11-21 18:00",
        },
        {
            players: ["Grace", "Henry"],
            scores: [5, 3],
            game_count: 8,
            create_at: "2024-11-20 14:20",
        },
        {
            players: ["Ivy", "Jack"],
            scores: [4, 4],
            game_count: 10,
            create_at: "2024-11-19 19:10",
        },
        {
            players: ["Alice", "Bob"],
            scores: [3, 2],
            game_count: 5,
            create_at: "2024-11-23 12:34",
        },
        {
            players: ["Charlie", "David"],
            scores: [1, 4],
            game_count: 7,
            create_at: "2024-11-22 15:45",
        },
        {
            players: ["Eve", "Frank"],
            scores: [2, 2],
            game_count: 6,
            create_at: "2024-11-21 18:00",
        },
        {
            players: ["Grace", "Henry"],
            scores: [5, 3],
            game_count: 8,
            create_at: "2024-11-20 14:20",
        },
        {
            players: ["Ivy", "Jack"],
            scores: [4, 4],
            game_count: 10,
            create_at: "2024-11-19 19:10",
        },
        {
            players: ["Alice", "Bob"],
            scores: [3, 2],
            game_count: 5,
            create_at: "2024-11-23 12:34",
        },
        {
            players: ["Charlie", "David"],
            scores: [1, 4],
            game_count: 7,
            create_at: "2024-11-22 15:45",
        },
        {
            players: ["Eve", "Frank"],
            scores: [2, 2],
            game_count: 6,
            create_at: "2024-11-21 18:00",
        },
        {
            players: ["Grace", "Henry"],
            scores: [5, 3],
            game_count: 8,
            create_at: "2024-11-20 14:20",
        },
        {
            players: ["Ivy", "Jack"],
            scores: [4, 4],
            game_count: 10,
            create_at: "2024-11-19 19:10",
        },
    ];

const MatchHistory = ({ matchHistory }) => {
    // Mock dữ liệu nếu không được truyền từ props
    matchHistory = matchHistory || data;

    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 10;

    const totalPages = Math.ceil(matchHistory.length / matchesPerPage);
    const startIndex = (currentPage - 1) * matchesPerPage;
    const currentMatches = matchHistory.slice(startIndex, startIndex + matchesPerPage);

    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className={styles.matchHistoryWrapper}>

            <div className={styles.matchHistory}>
                <h2 className={styles.title}>Match History</h2>
                <div className={styles.historyHeader}>
                    <div className={styles.column}>Người chơi</div>
                    <div className={styles.column}>Tỉ số</div>
                    <div className={styles.column}>Số trận</div>
                    <div className={styles.column}>Được tạo lúc</div>
                </div>
                <div className={styles.history}>
                    {currentMatches.map((match, index) => (
                        <HistoryCell key={index} match={match}/>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <button
                        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
                        onClick={() => handlePageChange("prev")}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                        onClick={() => handlePageChange("next")}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchHistory;

