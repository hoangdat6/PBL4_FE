import React, {useState} from "react";
import HistoryCell from "./HistoryCell/HistoryCell";
import styles from "./MatchHistory.module.scss";
import Loading from "../Loading/Loading";

const MatchHistoryComponent = ({
                                   matchHistory, loading, error,
                               }) => {
    const matchesPerPage = 6; // Số trận mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

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

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <ul className={styles.historyHeader}>
                <li className={styles.column}>Người chơi</li>
                <li className={styles.column}>Tỉ số</li>
                <li className={styles.column}>Số trận</li>
                <li className={styles.column}>Được tạo lúc</li>
            </ul>
            {matchHistory.length === 0 && <div className={styles.noData}>Không có dữ liệu</div>}
            <div className={styles.history}>
                {currentMatches.map((match, index) => (<HistoryCell key={index} match={match}/>))}
            </div>

            {matchHistory.length > 0 && (<div className={styles.pagination}>
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
            )}
        </>


    );
};

export default MatchHistoryComponent;
