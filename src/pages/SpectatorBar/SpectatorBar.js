import {useEffect, useState} from "react";
import {SPECTATORS_TOPIC} from "../../constants/socketEndpoint";
import SpectatorList from "../../components/SpectatorList/SpectatorList";


const SpectatorBar = ({stompClient, isConnected, roomCode}) => {
    const [spectators, setSpectators] = useState([]);


    useEffect(() => {
        if(!isConnected) return;
        // Lắng nghe WebSocket event (thay thế bằng cách subscribe topic nếu có)
        const chatSubscription = stompClient.current.subscribe(SPECTATORS_TOPIC(roomCode), (message) => {
            const spectators = JSON.parse(message.body);
            setSpectators(spectators);
            console.log(message.body);
        });

        return () => {
            chatSubscription?.unsubscribe();
        };
    }, [isConnected]);

    return (
        <>
            <SpectatorList spectators={spectators}/>
        </>
    )
}

export default SpectatorBar;