import React from 'react';
import PropTypes from 'prop-types';
import './GameResult.scss';
import ParticipantType from "../../enums/participantType";
import {PLAY_AGAIN} from "../../enums/PlayAgainCode";
import {useSelector} from "react-redux";

const GameResultComponent = ({ winnerId, playerId, handlePlayAgain, handleLeaveRoom, opponentPlayAgain, timer }) => {
    const participantType = useSelector((state) => state.room.participantType);
    const message = winnerId === null ? 'Trận đấu hòa!' : winnerId === playerId ? '🎉 Chúc mừng! Bạn đã thắng! 🎉' : participantType === ParticipantType.SPECTATOR ? `${winnerId} thắng` : `😢 Bạn đã thua. Hãy cố gắng lần sau! 😢`;
    const playAgainMessage = opponentPlayAgain.code === PLAY_AGAIN
        ? opponentPlayAgain.playerId !== playerId ?  'Đối thủ muốn chơi lại!' : "Đang chờ đối thủ ..." : 'Bạn muốn chơi lại không?';
    return (
        <div className="game-result">
            <div className="game-result__message">
                {message}
            </div>
            <div className="game-result__actions">
                <button className="game-result__btn play-again" onClick={handlePlayAgain}>
                    {playAgainMessage}
                </button>
                <button className="game-result__btn leave-room" onClick={handleLeaveRoom}>
                    Rời phòng {timer ? `(${timer}s)` : ''}
                </button>
            </div>
        </div>
    );
};

GameResultComponent.propTypes = {
    winnerId: PropTypes.number,
    playerId: PropTypes.number.isRequired,
    handlePlayAgain: PropTypes.func.isRequired,
    handleLeaveRoom: PropTypes.func.isRequired,
    opponentPlayAgain: PropTypes.object.isRequired,
    timer: PropTypes.number,
};

export default GameResultComponent;
