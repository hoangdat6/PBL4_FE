import axios from "axios";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/room/bot/`;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default apiClient;