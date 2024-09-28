import useWebSocket from "./useWebSocket";


const useJoinGame = ({roomId}) => {
    const {lastMessage, sendMessage} = useWebSocket(`http://localhost:8080/game?roomId=${roomId}`);

    return {lastMessage, sendMessage};
}

export default useJoinGame;