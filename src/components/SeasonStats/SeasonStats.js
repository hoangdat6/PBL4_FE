import React from "react";
import styles from "./SeasonStats.module.scss";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const SeasonStats = ({ data }) => {
    const {
        onlineMatches,
        machineMatches,
        friendMatches,
        playersCount,
        matchData} = data;
    return (
        <div className={styles.container}>

            {/* Stats Cards */}
            <div className={styles.statsCards}>
                <div className={`${styles.card} ${styles.onlineMatches}`}>
                    <h3>Số trận online</h3>
                    <p>{onlineMatches}</p>
                </div>
                {/*<div className={`${styles.card} ${styles.machineMatches}`}>*/}
                {/*    <h3>Số trận đấu với máy</h3>*/}
                {/*    <p>{machineMatches}</p>*/}
                {/*</div>*/}
                <div className={`${styles.card} ${styles.friendMatches}`}>
                    <h3>Số trận đấu với bạn bè</h3>
                    <p>{friendMatches}</p>
                </div>
                <div className={`${styles.card} ${styles.monthMatches}`}>
                    <h3>Số lượng người tham gia mùa giải</h3>
                    <p>{playersCount}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className={styles.chartSection}>
                <h3>Biểu đồ</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={matchData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="matches"
                            stroke="#6eb5ff"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <p className={styles.chartDescription}>
                    Biểu đồ: Sự thay đổi số trận đấu trong những ngày gần đây
                </p>
                <a href="#" className={styles.detailsLink}>
                    Danh sách chi tiết
                </a>
            </div>
        </div>
    );
};

export default SeasonStats;
