import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/player/`;


const getPlayerProfile = (id) => {
    return apiClient(API_URL).get(API_URL + "profile", {params: {id}});
}



const PlayerService = {
    getPlayerProfile,
}

export default PlayerService;