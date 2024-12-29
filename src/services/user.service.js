import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/user/`;


const getInfo = () => {
    /**
     * Return: {
     * "id": 0,
     * "name": "string",
     * "score": 0
     */
    return apiClient(API_URL).get(API_URL + "info");
}

const getAccountInfo = () => {
    /**
     * Return: {
     * "id": 0,
     * "name": "string",
     * "email": "string",
     */
    return apiClient(API_URL).get(API_URL + "account-info");
}

const updateAccountInfo = (data) => {
    /**
     * data: {
     * "id": 0,
     * "name": "string",
     * "email": "string",
     * }
     */
    return apiClient(API_URL).put(API_URL + "account-info", data);
}

const getMatchHistory = () => {
    /**
     * Return: [
     * {
     * "id": 0,
     * "player1": "string",
     * "player2": "string",
     * "created_at": "string",
     * }
     */
    return apiClient(API_URL).get(API_URL + "history");
}

const changePassword = (data) => {
    return apiClient(API_URL).put(API_URL + "change-password", data);
}

const getPlayerProfile = (id) => {
    return apiClient(API_URL).get(API_URL + "profile", {params: {id}});
}

const UserService = {
    getInfo,
    getAccountInfo,
    getMatchHistory,
    changePassword,
    updateAccountInfo,
    getPlayerProfile,
}

export default UserService;