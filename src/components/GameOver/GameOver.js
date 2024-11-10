import React from 'react';
import styles from './GameOver.module.scss';
import {PLAY_AGAIN} from "../../enums/PlayAgainCode";

const GameOver = ({
                      onPlayAgain, onLeaveRoom, playAgain, playerId, timer
                  }) => {
    const message = playAgain.code === PLAY_AGAIN && playAgain.playerId != playerId ? 'Đối thủ muốn chơi lại!' : 'Game Over!';


    return (<div className={styles.gameOver}>
            {playAgain.code === PLAY_AGAIN && playAgain.playerId != playerId && <p>Đối thủ muốn chơi lại!</p>}
            <button onClick={onPlayAgain}>Play Again</button>
            <button onClick={onLeaveRoom}>Leave Room ({timer})</button>
        </div>);
};

export default GameOver;