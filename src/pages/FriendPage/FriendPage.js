import FriendList from "../../components/FriendList/FriendList";

const data = [
    {
        id: 1,
        name: "Tuấn Đỗ",
        avatar: "https://i.pravatar.cc/50?u=tuan",
        lastActive: "2 months ago",
        countryFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/20px-Flag_of_Vietnam.svg.png",
    },
    {
        id: 2,
        name: "Alice Nguyen",
        avatar: "https://i.pravatar.cc/50?u=alice",
        lastActive: "1 week ago",
        countryFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/20px-Flag_of_Vietnam.svg.png",
    },
];

const friendRequests = [
    {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/50?u=alice",
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/50?u=alice",
    },
];
const FriendPage = () => {

    return (
        <FriendList friends={data} friendRequests={friendRequests} />
    );
}

export default FriendPage;