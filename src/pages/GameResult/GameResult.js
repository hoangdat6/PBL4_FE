
import React from 'react';
import GameResultComponent from "../../components/GameResult/GameResult";
import {useSelector} from "react-redux";

const GameResultPage = ({winnerId,
                            playerId,
                            handlePlayAgain,
                            handleLeaveRoom,
                            opponentPlayAgain,
                            timer
}) => {
    const {player1Info, player2Info} = useSelector((state) => state.room);
    const winnerName = winnerId === player1Info.id ? player1Info.name : player2Info.name;
    return (
        <>
            <GameResultComponent
                winnerId={winnerId}
                playerId={playerId}
                winnerName={winnerName}
                handlePlayAgain={handlePlayAgain}
                handleLeaveRoom={handleLeaveRoom}
                opponentPlayAgain={opponentPlayAgain}
                timer={timer}
            />
        </>
    );
}

export default GameResultPage;