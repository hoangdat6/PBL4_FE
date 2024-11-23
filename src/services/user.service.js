import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const getProfile = () => {
    return axios.get(API_URL + "user");
}



const UserService = {
    getProfile
}

export default UserService;