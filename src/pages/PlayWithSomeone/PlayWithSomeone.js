import { useEffect, useState } from "react";
import FindingOpponent from "../../components/FindingOpponent/FindingOpponent";
import { useNavigate } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import MatchMakingService from "../../services/matchMaking.service";
import useWebSocket from "./useWebSocket";

const PlayWithSomeone = () => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState(null);
    const [isFinding, setIsFinding] = useState(false);

    const {
        connect,
        isConnected,
        stompClient,
    } = useWebSocket(setRoomCode);

    const { timer, startTimer, resetTimer } = useTimer(30);

    // Function to handle finding opponent
    const findOpponent = async () => {
        try {
            setIsFinding(true);
            const response = await MatchMakingService.findOpponent();
            const { roomCode } = response.data;
            if (roomCode) {
                setRoomCode(roomCode);
            }
        } catch (error) {
            console.error("Error finding opponent:", error);
        } finally {
            setIsFinding(false);
        }
    };

    useEffect(() => {
        // Connect to WebSocket and start finding opponent
        connect();
    }, [connect]);

    useEffect(() => {
        if (isConnected) {
            startTimer();
            findOpponent();
        }
    }, [isConnected]);

    useEffect(() => {
        // Redirect to room if roomCode is set
        if (roomCode) {
            resetTimer();
            navigate(`/room/${roomCode}`);
        }
    }, [roomCode, navigate, resetTimer]);

    useEffect(() => {
        // Handle timeout
        if (timer === 0) {
            MatchMakingService.cancelFindingOpponent().then(() => {
                resetTimer();
                setIsFinding(false);
            }).catch((error) => {
                console.error("Error canceling finding opponent:", error);
            });

            if (stompClient.current) {
                stompClient.current.deactivate();
            }
            navigate("/");
        }
    }, [timer, navigate, stompClient]);

    return (
        <div>
            {!roomCode && <FindingOpponent timer={timer} isFinding={isFinding} />}
        </div>
    );
};

export default PlayWithSomeone;
