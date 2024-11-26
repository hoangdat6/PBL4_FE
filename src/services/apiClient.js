import axios from "axios";

const apiClient = (API_URL) => axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default apiClient;