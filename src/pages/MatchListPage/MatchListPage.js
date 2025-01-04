import React, { useState, useEffect } from "react";
import styles from "./MatchListPage.module.scss";
import MatchList from "../../components/Admin/MatchList/MatchList";
import {useNavigate} from "react-router-dom";
import AdminService from "../../services/admin.service";

const MatchListPage = () => {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate loading and fetch matches
    useEffect(() => {

        AdminService.getMatchList().then((response) => {
            setMatches(response.data);
            console.log(response.data);
            setLoading(false);
        }).catch((err) => {
            console.error("Error fetching match list:", err);
            setLoading(false);
        });

        // fetchMatches();
    }, []);

    const navigate = useNavigate();

    const handleViewMatch = (match) => {
        navigate(`/room/${match.roomCode}`);
    };

    return (
        <div style={{padding: "20px", height: "93%"}}>
            <h2 className={styles.title}>Danh sách trận đấu đang diễn ra</h2>

            {loading ? (
                <div style={{textAlign: "center", fontSize: "1.5rem", color: "#6eb5ff"}}>
                    Đang tải danh sách trận đấu...
                </div>
            ) : (
                <MatchList matches={matches} onViewMatch={handleViewMatch}/>
            )}
        </div>
    );
};

export default MatchListPage;
