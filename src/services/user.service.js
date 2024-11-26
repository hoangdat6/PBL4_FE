import axios from "axios";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/user/`;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const getProfile = () => {
    return apiClient.get(API_URL + "profile");
}

const getInfo = () => {
    return apiClient.get(API_URL + "info");
}

const getMatchHistory = () => {
    return apiClient.get(API_URL + "history");
}

const updateUser = (data) => {
    return apiClient.put(API_URL + "/", data);
}

const deleteUser = () => {
    return apiClient.delete(API_URL + "/");
}

const getProfileDetail = (id) => {
    return apiClient.get(API_URL + id);
}

const getInfoAccount = () => {
    return apiClient.get(API_URL + "info-account");
}

const updateInfoAccount = (data) => {
    return apiClient.put(API_URL + "info-account", data);
}

const changePassword = (data) => {
    return apiClient.put(API_URL + "change-password", data);
}

const UserService = {
    getProfile,
    getInfo,
    getMatchHistory,
    updateUser,
    deleteUser,
    getProfileDetail,
    getInfoAccount,
    updateInfoAccount,
    changePassword,
}

export default UserService;