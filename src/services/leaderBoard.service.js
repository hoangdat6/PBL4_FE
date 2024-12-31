import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/game/`;


const getLeaderBoard = async (page, pageSize, rankings = "Rookie") => {
    return await apiClient(API_URL).get('/leaderboard', {
        params: {
            page,
            pageSize,
            rankings
        }
    });
}

const LeaderBoardService = {
    getLeaderBoard,
}

export default LeaderBoardService;