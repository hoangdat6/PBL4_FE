import Leaderboard from "../../components/Leaderboard/Leaderboard";
import LeaderBoardService from "../../services/leaderBoard.service";
import {useState} from "react";

const fakeData = [
    {
        rank: 1,
        avatar: "https://i.pravatar.cc/30?img=1", // avatar ngẫu nhiên
        name: "Hoang Van Dat",
        wins: 115,
        losses: 17,
        draws: 0,
        streak: 10,
        playTime: "1 giờ 59 phút",
        points: 2725,
    },
    {
        rank: 2,
        avatar: "https://i.pravatar.cc/30?img=2",
        name: "Nguyen Thi Hoa",
        wins: 105,
        losses: 20,
        draws: 2,
        streak: 5,
        playTime: "1 giờ 45 phút",
        points: 2600,
    },
    {
        rank: 3,
        avatar: "https://i.pravatar.cc/30?img=3",
        name: "Tran Van Minh",
        wins: 95,
        losses: 30,
        draws: 3,
        streak: 7,
        playTime: "2 giờ 10 phút",
        points: 2500,
    },
    {
        rank: 4,
        avatar: "https://i.pravatar.cc/30?img=4",
        name: "Pham Thi Lan",
        wins: 85,
        losses: 35,
        draws: 5,
        streak: 4,
        playTime: "1 giờ 30 phút",
        points: 2400,
    },
    {
        rank: 5,
        avatar: "https://i.pravatar.cc/30?img=5",
        name: "Le Van Nam",
        wins: 75,
        losses: 40,
        draws: 8,
        streak: 3,
        playTime: "2 giờ 5 phút",
        points: 2300,
    },
    {
        rank: 1,
        avatar: "https://i.pravatar.cc/30?img=1", // avatar ngẫu nhiên
        name: "Hoang Van Dat",
        wins: 115,
        losses: 17,
        draws: 0,
        streak: 10,
        playTime: "1 giờ 59 phút",
        points: 2725,
    },
    {
        rank: 2,
        avatar: "https://i.pravatar.cc/30?img=2",
        name: "Nguyen Thi Hoa",
        wins: 105,
        losses: 20,
        draws: 2,
        streak: 5,
        playTime: "1 giờ 45 phút",
        points: 2600,
    },
    {
        rank: 3,
        avatar: "https://i.pravatar.cc/30?img=3",
        name: "Tran Van Minh",
        wins: 95,
        losses: 30,
        draws: 3,
        streak: 7,
        playTime: "2 giờ 10 phút",
        points: 2500,
    },
    {
        rank: 4,
        avatar: "https://i.pravatar.cc/30?img=4",
        name: "Pham Thi Lan",
        wins: 85,
        losses: 35,
        draws: 5,
        streak: 4,
        playTime: "1 giờ 30 phút",
        points: 2400,
    },
    {
        rank: 5,
        avatar: "https://i.pravatar.cc/30?img=5",
        name: "Le Van Nam",
        wins: 75,
        losses: 40,
        draws: 8,
        streak: 3,
        playTime: "2 giờ 5 phút",
        points: 2300,
    },
    {
        rank: 1,
        avatar: "https://i.pravatar.cc/30?img=1", // avatar ngẫu nhiên
        name: "Hoang Van Dat",
        wins: 115,
        losses: 17,
        draws: 0,
        streak: 10,
        playTime: "1 giờ 59 phút",
        points: 2725,
    },
    {
        rank: 2,
        avatar: "https://i.pravatar.cc/30?img=2",
        name: "Nguyen Thi Hoa",
        wins: 105,
        losses: 20,
        draws: 2,
        streak: 5,
        playTime: "1 giờ 45 phút",
        points: 2600,
    },
    {
        rank: 3,
        avatar: "https://i.pravatar.cc/30?img=3",
        name: "Tran Van Minh",
        wins: 95,
        losses: 30,
        draws: 3,
        streak: 7,
        playTime: "2 giờ 10 phút",
        points: 2500,
    },
    {
        rank: 4,
        avatar: "https://i.pravatar.cc/30?img=4",
        name: "Pham Thi Lan",
        wins: 85,
        losses: 35,
        draws: 5,
        streak: 4,
        playTime: "1 giờ 30 phút",
        points: 2400,
    },
    {
        rank: 5,
        avatar: "https://i.pravatar.cc/30?img=5",
        name: "Le Van Nam",
        wins: 75,
        losses: 40,
        draws: 8,
        streak: 3,
        playTime: "2 giờ 5 phút",
        points: 2300,
    },
    {
        rank: 1,
        avatar: "https://i.pravatar.cc/30?img=1", // avatar ngẫu nhiên
        name: "Hoang Van Dat",
        wins: 115,
        losses: 17,
        draws: 0,
        streak: 10,
        playTime: "1 giờ 59 phút",
        points: 2725,
    },
    {
        rank: 2,
        avatar: "https://i.pravatar.cc/30?img=2",
        name: "Nguyen Thi Hoa",
        wins: 105,
        losses: 20,
        draws: 2,
        streak: 5,
        playTime: "1 giờ 45 phút",
        points: 2600,
    },
    {
        rank: 3,
        avatar: "https://i.pravatar.cc/30?img=3",
        name: "Tran Van Minh",
        wins: 95,
        losses: 30,
        draws: 3,
        streak: 7,
        playTime: "2 giờ 10 phút",
        points: 2500,
    },
    {
        rank: 4,
        avatar: "https://i.pravatar.cc/30?img=4",
        name: "Pham Thi Lan",
        wins: 85,
        losses: 35,
        draws: 5,
        streak: 4,
        playTime: "1 giờ 30 phút",
        points: 2400,
    },
    {
        rank: 5,
        avatar: "https://i.pravatar.cc/30?img=5",
        name: "Le Van Nam",
        wins: 75,
        losses: 40,
        draws: 8,
        streak: 3,
        playTime: "2 giờ 5 phút",
        points: 2300,
    },
];


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

    return (
        <Leaderboard data={fakeData}
                     onGetLeaderboard={handleGetLeaderboard}
                     loading={loading}
                     error={error}
        />

    )
}

export default LeaderboardPage;