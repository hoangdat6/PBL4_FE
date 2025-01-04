import React, {useState, useEffect} from "react";
import PlayerList from "../../components/Admin/PlayerList/PlayerList";
import styles from "./PlayerListPage.module.scss";
import AdminService from "../../services/admin.service";

const PlayerListPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const playersPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    /**
     * Danh sách người chơi hiện tại
     * @type {Array
     * <{
     *    id: number,
     *    name: string,
     *    email: string,
     *    totalGame: number,
     *    winGame: number,
     *    loseGame: number,
     *    drawGame: number,
     *    createdAt: string
     */
    const [currentPlayers, setCurrentPlayers] = useState([]);

    useEffect(() => {

        AdminService.getPlayerList("win", currentPage, playersPerPage).then((response) => {
            const {totalPage, playerStatisticDTOList} = response.data;
            setTotalPages(totalPage);

            setCurrentPlayers(playerStatisticDTOList);

            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        });

    }, []);


    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (currentPage >= 1) setCurrentPage((prev) => prev - 1);
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
