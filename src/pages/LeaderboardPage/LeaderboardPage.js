import Leaderboard from "../../components/Leaderboard/Leaderboard";
import LeaderBoardService from "../../services/leaderBoard.service";
import React, {useEffect, useState} from "react";

import MrHappy from "../../assets/statics/icon_avatar/mrhappy.png";
import Tomato from "../../assets/statics/icon_avatar/potato.png";
import Potato from "../../assets/statics/icon_avatar/potato.png";
import A from "../../assets/statics/icon_avatar/A.png";
import Barbbeast from "../../assets/statics/icon_avatar/Barbbeast.png";
import Corona from "../../assets/statics/icon_avatar/Corona.png";
import Dengue from "../../assets/statics/icon_avatar/Dengue.png";
import Ebola from "../../assets/statics/icon_avatar/Ebola.png";
import Ghosty from "../../assets/statics/icon_avatar/Ghosty.png";
import Gluttonous from "../../assets/statics/icon_avatar/Gluttonous.png";
import Hantavirus from "../../assets/statics/icon_avatar/Hantavirus.png";
import Influenza from "../../assets/statics/icon_avatar/Influenza.png";
import Inglorious from "../../assets/statics/icon_avatar/Inglorious.png";
import MERS from "../../assets/statics/icon_avatar/MERS.png";
import Moustache from "../../assets/statics/icon_avatar/Moustache.png";
import Rotavirus from "../../assets/statics/icon_avatar/Rotavirus.png";
import Rustseeker from "../../assets/statics/icon_avatar/Rustseeker.png";
import SARS from "../../assets/statics/icon_avatar/SARS.png";
import Scab from "../../assets/statics/icon_avatar/scab.png";
import TheCreepyCrawler from "../../assets/statics/icon_avatar/TheCreepyCrowler.png";
import TheNiceLady from "../../assets/statics/icon_avatar/TheNiceLady.png";
import Tombtooth from "../../assets/statics/icon_avatar/Tombtooth.png";
import Vexmask from "../../assets/statics/icon_avatar/Vexmask.png";
import Vicious from "../../assets/statics/icon_avatar/Vicious.png";

import styles from "./LeaderboardPage.module.scss";

// Danh sách các ảnh đã import
const avatars = [MrHappy, Tomato, A, Barbbeast, Corona, Dengue, Ebola, Ghosty, Gluttonous, Hantavirus, Influenza, Inglorious, MERS, Moustache, Potato, Rotavirus, Rustseeker, SARS, Scab, TheCreepyCrawler, TheNiceLady, Tombtooth, Vexmask, Vicious,];

// Hàm chọn ảnh ngẫu nhiên
function getRandomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
}

// fakeData với avatar được random
const fakeData = [{
    rank: 1,
    avatar: getRandomAvatar(),
    name: "Hoang Van Dat",
    wins: 115,
    losses: 17,
    draws: 0,
    streak: 10,
    playTime: "1 giờ 59 phút",
    points: 2725,
}, {
    rank: 2,
    avatar: getRandomAvatar(),
    name: "Nguyen Thi Hoa",
    wins: 105,
    losses: 20,
    draws: 2,
    streak: 5,
    playTime: "1 giờ 45 phút",
    points: 2600,
}, {
    rank: 3,
    avatar: getRandomAvatar(),
    name: "Tran Van Minh",
    wins: 95,
    losses: 30,
    draws: 3,
    streak: 7,
    playTime: "2 giờ 10 phút",
    points: 2500,
}, {
    rank: 4,
    avatar: getRandomAvatar(),
    name: "Pham Thi Lan",
    wins: 85,
    losses: 35,
    draws: 5,
    streak: 4,
    playTime: "1 giờ 30 phút",
    points: 2400,
}, {
    rank: 5,
    avatar: getRandomAvatar(),
    name: "Le Van Nam",
    wins: 75,
    losses: 40,
    draws: 8,
    streak: 3,
    playTime: "2 giờ 5 phút",
    points: 2300,
}, {
    rank: 6,
    avatar: getRandomAvatar(),
    name: "Ngo Thi Bich",
    wins: 70,
    losses: 45,
    draws: 2,
    streak: 6,
    playTime: "1 giờ 50 phút",
    points: 2250,
}, {
    rank: 7,
    avatar: getRandomAvatar(),
    name: "Vu Van Khoa",
    wins: 65,
    losses: 50,
    draws: 5,
    streak: 2,
    playTime: "1 giờ 35 phút",
    points: 2200,
}, {
    rank: 8,
    avatar: getRandomAvatar(),
    name: "Do Thi Mai",
    wins: 60,
    losses: 55,
    draws: 3,
    streak: 1,
    playTime: "2 giờ",
    points: 2150,
}, {
    rank: 9,
    avatar: getRandomAvatar(),
    name: "Nguyen Van Thanh",
    wins: 55,
    losses: 60,
    draws: 2,
    streak: 0,
    playTime: "2 giờ 15 phút",
    points: 2100,
}, {
    rank: 10,
    avatar: getRandomAvatar(),
    name: "Tran Thi Ngoc",
    wins: 50,
    losses: 65,
    draws: 4,
    streak: 3,
    playTime: "1 giờ 40 phút",
    points: 2050,
},];


const LeaderboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const handleGetLeaderboard = (page) => {
        LeaderBoardService.getLeaderBoard(page).then((response) => {
            setData(response.data);
            setLoading(false);
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className={styles.rankingTableContainer}>
            <h2 className={styles.title}>Bảng xếp hạng</h2>
            <Leaderboard data={fakeData}
                         onGetLeaderboard={handleGetLeaderboard}
                         loading={loading}
                         error={error}
            />
        </div>
    )
}

export default LeaderboardPage;