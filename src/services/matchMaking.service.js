import apiClient from "./apiClient";

const API_URL = `${process.env.REACT_APP_CARO_BE_API_URL}/api/random-match/`;


const findOpponent = () => {
    return apiClient(API_URL).post(API_URL + "find-opponent", {});
}

const cancelFindingOpponent = () => {
    return apiClient(API_URL).post(API_URL + "cancel", {});
}

const MatchMakingService = {
    findOpponent,
    cancelFindingOpponent,
}

export default MatchMakingService;