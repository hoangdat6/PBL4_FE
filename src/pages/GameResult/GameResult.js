
import React from 'react';
import GameResultComponent from "../../components/GameResult/GameResult";

const GameResultPage = ({winnerId,
                            playerId,
                            handlePlayAgain,
                            handleLeaveRoom,
                            opponentPlayAgain,
                            timer
}) => {

    return (
        <>
            <GameResultComponent
                winnerId={winnerId}
                playerId={playerId}
                handlePlayAgain={handlePlayAgain}
                handleLeaveRoom={handleLeaveRoom}
                opponentPlayAgain={opponentPlayAgain}
                timer={timer}
            />
        </>
    );
}

export default GameResultPage;