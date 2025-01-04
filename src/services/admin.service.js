import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/admin/`;


const getMatchList = async () => {
    return await apiClient(API_URL).get('/match-list', {});
}

const getPlayerList = async (sort, page, size = 10) => {
    return await apiClient(API_URL).get('/get-all-players', {params: {sort, page, size}});
}

const getSeasonStats = async () => {
    return await apiClient(API_URL).get('/season-statistic', {});
}

const AdminService = {
    getMatchList,
    getPlayerList,
    getSeasonStats,
}

export default AdminService;