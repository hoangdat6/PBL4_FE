import { useEffect, useState } from "react";
import FindingOpponent from "../../components/FindingOpponent/FindingOpponent";
import { useNavigate } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import MatchMakingService from "../../services/matchMaking.service";
import useWebSocket from "./useWebSocket";

const PlayWithSomeone = () => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState(null);
    const [isFinding, setIsFinding] = useState(true);

    const {
        connect,
        isConnected,
        stompClient
    } = useWebSocket(setRoomCode);

    const { timer, startTimer, resetTimer } = useTimer(30);

    // Function to handle finding opponent
    const findOpponent = async () => {
        try {
            setIsFinding(true);
            MatchMakingService.findOpponent().then((response) => {
                const { roomCode } = response.data;
                if (roomCode) {
                    setRoomCode(roomCode);
                }
            }).catch((error) => {
                console.error("Error finding opponent");
            });
        } catch (error) {
            console.error("Error finding opponent");
        }
    };

    useEffect(() => {
        // Connect to WebSocket and start finding opponent
        connect();
    }, []);

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
            handleCancelMatchmaking();
            navigate("/");
        }
    }, [timer, navigate, stompClient]);


    const handleCancelMatchmaking = async () => {
        if (isFinding) {
            try {
                await MatchMakingService.cancelFindingOpponent();
                setIsFinding(false);
                if (stompClient.current) {
                    stompClient.current.deactivate();
                }
            } catch (error) {
                console.error("Error canceling matchmaking");
            }
        }
    };

    useEffect(() => {
        // Cleanup function to handle component unmount (back button, redirect)
        return () => {
            handleCancelMatchmaking();
        };
    }, [isFinding, stompClient]);


    return (
        <div>
            {isFinding && <FindingOpponent timer={timer} />}
        </div>
    );
};

export default PlayWithSomeone;