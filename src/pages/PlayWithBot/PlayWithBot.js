import React, {useEffect} from 'react';
import RoomBot from "./RoomBot";
import useGameBot from "../../hooks/useGameBot";
import Loading from "../../components/Loading/Loading";
import RoomPlayLayout from "../../layouts/RoomPlayLayout";
import PrivateRoute from "../../components/PrivateRoute";
import Avatar from "../../assets/statics/imgs/Avatar.png";
import Rank from "../../assets/statics/imgs/Rank.svg";
import checker2 from "../../assets/statics/imgs/checker2.svg";
import checker1 from "../../assets/statics/imgs/checker1.svg";
import DefaultAvatar from "../../assets/statics/default_avatar/Glowface.png";
import GameResult from "../GameResult/GameResult";
import RoomNotFound from "../../components/RoomNotFound/RoomNotFound";
import {getAvatarByName} from "../../utils/AvatarUtils";


const PlayWithBot = () => {

    const {
        board,
        isFirstPlayer,
        isPlayerTurn,
        isPlaying,
        isEndGame,
        roomCode,
        lastMove,
        player,
        winnerId,
        showResult,
        isRoomNotFound,
        winningCells,
        handleClick,
        createRoom,
        joinRoom,
        leaveRoomWithPopup,
    } = useGameBot();

    useEffect(() => {
        if(roomCode) {
            joinRoom(roomCode);
        }else {
            createRoom();
        }
    }, []);

    const player1 = {
        playerId: player?.id,
        playerName: player?.name || "Player",
        time: 0,
        remainMoveDuration: 0,
        moveDuration: 0,
        score: 0,
        avatar: player?.avatar,
        rankIcon: player?.rankIcon || Rank,
        checkers: checker2,
        isTurn: isPlayerTurn,
        reverse: true,
    }

    const player2 = {
        playerId: -1,
        playerName: "Bot",
        time: 0,
        remainMoveDuration: 0,
        moveDuration: 0,
        score: 0,
        avatar: Avatar,
        rankIcon: Rank,
        checkers: checker1,
        isTurn: !isPlayerTurn,
        reverse: false,
    }

    const handleSendPlayAgain = () => {

    }

    const renderContent = () => {
        if (isRoomNotFound) {
            return <RoomNotFound />;
        }

        if(!isPlaying ) {
            return <Loading />
        }

        if (isEndGame && showResult) {
            return <GameResult
                winnerId={winnerId}
                playerId={player?.id}
                handlePlayAgain={handleSendPlayAgain}
                handleLeaveRoom={leaveRoomWithPopup}
                opponentPlayAgain={true}
                timer={null}
                playerInfo={{seasonScore: 0}}
            />
        }

        return <RoomBot
            board={board}
            isFirstPlayer={isFirstPlayer}
            isPlayer={true}
            isPlayerTurn={isPlayerTurn}
            handleClick={handleClick}
            leaveRoomWithPopup={leaveRoomWithPopup}
            lastMove={lastMove}
            winningCells={winningCells}
        />
    };

    const leftSide = <></>;
    const rightSide = <></>;

    return (

    <PrivateRoute>
        <RoomPlayLayout
            player1={player1}
            player2={player2}   
            onLeaveRoom={leaveRoomWithPopup}
            leftSide={leftSide}
            rightSide={rightSide}
            isGameStarted={isPlaying}
            winnerId={winnerId}
            playerId={player?.id}
            isPlayer={true}
            showResult={showResult}
        >
            {renderContent()}
        </RoomPlayLayout>
    </PrivateRoute>
    );
}

export default PlayWithBot;