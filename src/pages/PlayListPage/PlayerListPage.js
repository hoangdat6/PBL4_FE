import React, { useState, useEffect } from "react";
import PlayerList from "../../components/Admin/PlayerList/PlayerList";
import styles from "./PlayerListPage.module.scss";

const PlayerListPage = () => {
    // Mock data
    const allPlayers = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Player ${index + 1}`,
        email: `player${index + 1}@example.com`,
        avatar: null, // Sử dụng avatar mặc định
        match: Math.floor(Math.random() * 100) + 1, // Số trận chơi ngẫu nhiên
        registeredAt: new Date(
            2024,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
        ).toLocaleDateString(),
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage] = useState(10); // Số người chơi trên mỗi trang
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // Giả lập loading
        return () => clearTimeout(timer);
    }, []);

    // Tính toán dữ liệu người chơi hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * playersPerPage;
    const currentPlayers = allPlayers.slice(
        startIndex,
        startIndex + playersPerPage
    );

    const totalPages = Math.ceil(allPlayers.length / playersPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className={styles.player_list}>
            <h2 className={styles.title}>Danh sách người chơi</h2>
            <PlayerList
                currentPlayers={currentPlayers}
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                playersPerPage={playersPerPage}
                loading={loading}
            />
        </div>
    );
};

export default PlayerListPage;
