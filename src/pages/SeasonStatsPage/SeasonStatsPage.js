import React, { useState, useEffect } from "react";
import SeasonStats from "../../components/SeasonStats/SeasonStats";
import styles from "./SeasonStatsPage.module.scss";
import AdminService from "../../services/admin.service";
import Loading from "../../components/Loading/Loading";
import useAdmin from "../../hooks/useAdmin";
import { useNavigate } from 'react-router-dom';

const data = {
    onlineMatches: 100,
    machineMatches: 50,
    friendMatches: 50,
    playersCount: 200,
    matchData: [
        { date: "01/01/2024", matches: 10 },
        { date: "02/01/2024", matches: 100 },
        { date: "03/01/2024", matches: 90 },
        { date: "04/01/2024", matches: 80 },
        { date: "05/01/2024", matches: 50 },
        { date: "06/01/2024", matches: 60 },
        { date: "07/01/2024", matches: 70 },
        { date: "08/01/2024", matches: 80 },
        { date: "09/01/2024", matches: 90 },
        { date: "10/01/2024", matches: 100 },
    ],
}

const SeasonStatsPage = () => {
    const [seasonData, setSeasonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAdmin, loading: isAdminLoading } = useAdmin();
    const navigate = useNavigate();
    useEffect(() => {

        if(!isAdminLoading && !isAdmin){
            return navigate("/401")
        }

        if (isAdminLoading) {
            return;
        }

        const fetchSeasonStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await AdminService.getSeasonStats();
                setSeasonData(response.data);
            } catch (err) {
                setError("Error fetching season stats. Please try again later.");
                console.error("Error fetching season stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSeasonStats();
    }, [isAdmin, navigate, isAdminLoading]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Quản lý trận đấu</h2>
            {loading && <Loading />}
            {error && <p>Error: {error}</p>}
            {seasonData && <SeasonStats data={seasonData} />}
        </div>
    );
};

export default SeasonStatsPage;