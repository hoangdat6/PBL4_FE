import axios from "axios";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/auth/`;

const register = (name, email, password, avatar) => {
    return axios.post(API_URL + "signup", {
        name,
        email,
        password,
        avatar
    });
};

const login = (email, password) => {
    return axios.post(
        API_URL + "signin",
        { email, password },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
};

const logout = () => {
    return axios.post(API_URL + "signout").then((response) => {
        console.log(response.data);
        return response.data;
    });
};

const getCurrentUser = () => {
    return axios.get(API_URL + "user", { withCredentials: true });
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;