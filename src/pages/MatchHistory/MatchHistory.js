import MatchHistoryComponent from "../../components/MatchHistory/MatchHistoryComponent";
import React, {useEffect, useState} from "react";
import UserService from "../../services/user.service";
import {useSelector} from "react-redux";
import styles from "./MatchHistory.module.scss";


const MatchHistory = () => {
    const [matchHistory, setMatchHistory] = useState([]); // Lưu trữ lịch sử trận đấu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Lưu thông tin lỗi nếu có
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        // Call API để lấy dữ liệu
        const fetchMatchHistory = () => {
            UserService.getMatchHistory().then((response) => {
                setMatchHistory(response.data);
                setLoading(false);
            }).catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        };
        if (isAuthenticated)
            fetchMatchHistory();
    }, []); // Chỉ chạy một lần khi component được mount

    return (
        <div className={styles.matchHistoryWrapper}>
            <div className={styles.matchHistory}>
                <h2 className={styles.title}>Lịch sử đấu</h2>
                <MatchHistoryComponent matchHistory={matchHistory}
                                       loading={loading}
                                       error={error}
                />
            </div>
        </div>
    );
}
export default MatchHistory;