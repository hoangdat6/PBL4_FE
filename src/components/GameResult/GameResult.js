// import React from 'react';
// import PropTypes from 'prop-types';
// import './GameResult.scss';
// import ParticipantType from "../../enums/participantType";
// import {PLAY_AGAIN} from "../../enums/PlayAgainCode";
// import {useSelector} from "react-redux";
//
// const GameResultComponent = ({ winnerId, winnerName, playerId, handlePlayAgain, handleLeaveRoom, opponentPlayAgain, timer }) => {
//     const participantType = useSelector((state) => state.room.participantType);
//     const message = winnerId === null ? 'Trận đấu hòa!' : winnerId === playerId ? '🎉 Chúc mừng! Bạn đã thắng! 🎉' : participantType === ParticipantType.SPECTATOR ? `${winnerName} thắng` : `😢 Bạn đã thua. Hãy cố gắng lần sau! 😢`;
//
//     const playAgainMessage = () => {
//         if (opponentPlayAgain.code === PLAY_AGAIN) {
//             if(participantType === ParticipantType.SPECTATOR) {
//                 return `Người chơi đang chơi lại!`;
//             }
//             if (opponentPlayAgain.playerId !== playerId) {
//                 return 'Đối thủ muốn chơi lại!';
//             }
//             return "Đang chờ đối thủ ...";
//         }
//         return 'Bạn muốn chơi lại không?';
//     }
//
//     return (
//         <div className="game-result">
//             <div className="game-result__message">
//                 {message}
//             </div>
//             <div className="game-result__actions">
//                 <button className="game-result__btn play-again" onClick={handlePlayAgain}>
//                     {playAgainMessage()}
//                 </button>
//                 <button className="game-result__btn leave-room" onClick={handleLeaveRoom}>
//                     Rời phòng {timer ? `(${timer}s)` : ''}
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// GameResultComponent.propTypes = {
//     winnerId: PropTypes.number,
//     playerId: PropTypes.number.isRequired,
//     handlePlayAgain: PropTypes.func.isRequired,
//     handleLeaveRoom: PropTypes.func.isRequired,
//     opponentPlayAgain: PropTypes.object.isRequired,
//     timer: PropTypes.number,
// };
//
// export default GameResultComponent;


import React, {useEffect, useState} from 'react';
import './GameResult.scss';
import ParticipantType from "../../enums/participantType";
import {PLAY_AGAIN} from "../../enums/PlayAgainCode";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const GameResultComponent = ({
                                 winnerId,
                                 winnerName,
                                 playerId,
                                 handlePlayAgain,
                                 handleLeaveRoom,
                                 opponentPlayAgain,
                                 timer,
                                 seasonScore = 60
                             }) => {
    const participantType = useSelector((state) => state.room.participantType);
    const message = winnerId === null
        ? 'Trận đấu hòa!'
        : winnerId === playerId
            ? '🎉 Chúc mừng! Bạn đã thắng! 🎉'
            : participantType === ParticipantType.SPECTATOR
                ? `${winnerName} thắng`
                : `😢 Bạn đã thua. Hãy cố gắng lần sau! 😢`;

    const [displayedScore, setDisplayedScore] = useState(0);

    // Animation logic for increasing the score
    useEffect(() => {
        let interval = null;
        if (displayedScore < seasonScore) {
            interval = setInterval(() => {
                setDisplayedScore((prev) => {
                    if (prev >= seasonScore) {
                        clearInterval(interval);
                        return seasonScore;
                    }
                    return prev + 1;
                });
            }, 20); // Increase score every 20ms
        }
        return () => clearInterval(interval);
    }, [seasonScore, displayedScore]);

    const playAgainMessage = () => {
        if (opponentPlayAgain && opponentPlayAgain.code === PLAY_AGAIN) {
            if (participantType === ParticipantType.SPECTATOR) {
                return `Người chơi đang chơi lại!`;
            }
            if (opponentPlayAgain.playerId !== playerId) {
                return 'Đối thủ muốn chơi lại!';
            }
            return "Đang chờ đối thủ ...";
        }
        return 'Bạn muốn chơi lại không?';
    };

    return (
        <div className="game-result">
            <div className="game-result__message">
                {message}
            </div>
            {/*{*/}
            {/*    participantType === ParticipantType.PLAYER && (*/}
            {/*        <div className="game-result__score">*/}
            {/*            <div className="game-result__score-bar">*/}
            {/*                <div*/}
            {/*                    className="game-result__score-progress"*/}
            {/*                    style={{width: `${(displayedScore / seasonScore) * 100}%`}}*/}
            {/*                ></div>*/}
            {/*            </div>*/}
            {/*            <div className="game-result__score-text">*/}
            {/*                Điểm mùa: {displayedScore}/{seasonScore}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}

            <div className="game-result__actions">
                {
                    participantType === ParticipantType.PLAYER && (
                        <button className="game-result__btn play-again" onClick={handlePlayAgain}>
                            {playAgainMessage()}
                        </button>
                    )
                }
                <button className="game-result__btn leave-room" onClick={handleLeaveRoom}>
                    Rời phòng {timer ? `(${timer}s)` : ''}
                </button>
            </div>
        </div>
    );
};

GameResultComponent.propTypes = {
    winnerId: PropTypes.number,
    playerId: PropTypes.number,
    handlePlayAgain: PropTypes.func,
    handleLeaveRoom: PropTypes.func,
    opponentPlayAgain: PropTypes.object,
    timer: PropTypes.number,
    seasonScore: PropTypes.number,
};

export default GameResultComponent;
