import CaroBoardUI from "../../components/CaroBoard/CaroBoardUI/CaroBoardUI";
import React from "react";

const RoomBot = ({
                        board,
                        isFirstPlayer,
                        isPlayer,
                        isPlayerTurn,
                        handleClick,
                     lastMove

                 }) => {

    return (
        <CaroBoardUI
            board={board}
            handleClick={handleClick}
            isStartPlayer={isFirstPlayer}
            isPlayer={isPlayer}
            isPlayerTurn={isPlayerTurn}
            lastMove={lastMove}
        />
    );
};

RoomBot.layouts = "DefaultLayout";

export default RoomBot;