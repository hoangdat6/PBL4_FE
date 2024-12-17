import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/leaderboard/`;


const getLeaderBoard = async (page) => {
    return await apiClient(API_URL).get('/', {params: {page}});
}

const LeaderBoardService = {
    getLeaderBoard,
}

export default LeaderBoardService;