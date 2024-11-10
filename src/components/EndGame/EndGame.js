

const EndGame = ({handleLeaveRoom, handlePlayAgain}) => {
    return (
        <div>
            <h1>End Game</h1>
            <button
                onClick={() => {handlePlayAgain()}}
            >
                Play Again
            </button>
            <button
                onClick={() => {handleLeaveRoom()}}
            >
                Leave
            </button>
        </div>
    )
}

export default EndGame;