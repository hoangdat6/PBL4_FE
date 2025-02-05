import axios from "axios";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/test/`;

const getPublicContent = () => {
    return axios.get(API_URL + "all");
}

const getUserBoard = () => {
    return axios.get(API_URL + "user");
}

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod");
}

const getAdminBoard = () => {
    return axios.get(API_URL + "admin");
}

const TestService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
}

export default TestService;