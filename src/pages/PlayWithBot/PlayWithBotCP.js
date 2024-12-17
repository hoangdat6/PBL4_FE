import React, {useEffect} from 'react';
import RoomBot from "./RoomBot";
import useGameBot from "../../hooks/useGameBot";
import useLeaveRoom from "../../hooks/useLeaveRoom";
import Loading from "../../components/Loading/Loading";
import RoomPlayLayout from "../PlayWithFriendPage/RoomPlayLayout";
import PrivateRoute from "../../components/PrivateRoute";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import showLeaveRoomPopup from "../../components/showLeaveRoomPopup/showLeaveRoomPopup";
import GameBot from "../../services/gameBot.service";
import {useNavigate} from "react-router-dom";

const PlayWithBot = () => {
    const {
        board,
        isPlayerStart,
        isPlayer,
        isPlayerTurn,
        isPlaying,
        roomCode,
        lastMove,
        handleClick,
        createRoom,
        joinRoom
    } = useGameBot();

    const { leaveRoomWithPopup } = useLeaveRoom();

    useEffect(() => {
        if(roomCode) {
            joinRoom(roomCode);
        }else {
            createRoom();
        }
    }, []);

    const player1 = {
        playerId: 1,
        playerName: "Player",
        time: 0,
        remainMoveDuration: 0,
        moveDuration: 0,
        isInfiniteTime: true,
        score: 0,
        avatar: Avatar,
        rankIcon: Rank,
        checkers: checker2,
        isTurn: true,
        reverse: true,
    }

    const player2 = {
        playerId: -1,
        playerName: "Bot",
        time: 0,
        remainMoveDuration: 0,
        moveDuration: 0,
        isInfiniteTime: true,
        score: 0,
        avatar: Avatar,
        rankIcon: Rank,
        checkers: checker1,
        isTurn: false,
        reverse: false,
    }

    const renderContent = () => {
        if(!isPlaying) {
            return <Loading/>
        }

        return <RoomBot
            player1={player1}
            player2={player2}
            board={board}
            isPlayerStart={isPlayerStart}
            isPlayer={isPlayer}
            isPlayerTurn={isPlayerTurn}
            handleClick={handleClick}
            leaveRoomWithPopup={leaveRoomWithPopup}
            lastMove={lastMove}/>
    };

    const leftSide = <></>;
    const rightSide = <></>;

    const navigate = useNavigate();

    const leaveRoom = () => {
        GameBot.leaveRoom().then(() => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }

    const leaveRoomHandler = () => {
        showLeaveRoomPopup(leaveRoom);
    }

    return (

    <PrivateRoute>
        <RoomPlayLayout
            player1={player1}
            player2={player2}   
            onLeaveRoom={leaveRoomHandler}
            leftSide={leftSide}
            rightSide={rightSide}
            isGameStarted={isPlaying}
        >
            {renderContent()}
        </RoomPlayLayout>
    </PrivateRoute>
    );
}

export default PlayWithBot;