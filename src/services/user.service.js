import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/user/`;

const getProfile = () => {
    return apiClient(API_URL).get(API_URL + "profile");
}

const getInfo = () => {
    return apiClient(API_URL).get(API_URL + "info");
}

const getMatchHistory = () => {
    return apiClient(API_URL).get(API_URL + "history");
}

const updateUser = (data) => {
    return apiClient(API_URL).put(API_URL + "/", data);
}

const deleteUser = () => {
    return apiClient(API_URL).delete(API_URL + "/");
}

const getProfileDetail = (id) => {
    return apiClient(API_URL).get(API_URL + id);
}

const getInfoAccount = () => {
    return apiClient(API_URL).get(API_URL + "info-account");
}

const updateInfoAccount = (data) => {
    return apiClient(API_URL).put(API_URL + "info-account", data);
}

const changePassword = (data) => {
    return apiClient(API_URL).put(API_URL + "change-password", data);
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