import { useState, useEffect } from "react";
import UserService from "../../services/user.service";

const useProfile = () => {
    const [playerProfile, setPlayerProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowProfile, setIsShowProfile] = useState(false);

    const fetchProfile = (playerId) => {
        setIsLoading(true);
        UserService.getPlayerProfile(playerId)
            .then((response) => {
                /**
                 * response.data = {
                 *  id: 1,
                 *  name: "John Doe",
                 *  avatar: "https://example.com/avatar.jpg",
                 *  dateJoined: "2021-12-31",
                 *  points: 1000,
                 *  rank: 1,
                 *  wins: 10,
                 *  draws: 5,
                 *  losses: 3,
                 *  streak: 2,
                 *  playTime: "10h 30m"
                 */
                setPlayerProfile(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching player profile:", err);
                setIsLoading(false);
            });
    };

    const showProfile = (playerId) => {
        fetchProfile(playerId);
        setIsShowProfile(true);
    };

    const hideProfile = () => {
        setIsShowProfile(false);
    };

    return { playerProfile, isLoading, isShowProfile, showProfile, hideProfile };
};

export default useProfile;