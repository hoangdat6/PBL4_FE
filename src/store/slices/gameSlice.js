import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    winnerId: null,
    moves: [],
    lastMove: null,
    isGameStarted: false,
    startPlayerId: null,
    isPlayerTurn: false,
    nthMove: 0,
    playerTimeInfo1 : {
        remainTime: 300,
        remainMoveDuration: 0,
        playedTime: 0,
    },
    playerTimeInfo2 : {
        remainTime: 300,
        remainMoveDuration: 0,
        playedTime: 0,
    },
    boardState: {
        board: [],
        size: 16,
        winLength: 5,
    },
    gameConfig: {
        totalTime: 0,
        moveDuration: 0,
        firstMoveOption: null,
    },
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state, action) => {
            const {startPlayerId, nthMove, boardState, winnerId, lastMove, isGameStated} = action.payload;
            state.startPlayerId = startPlayerId;
            state.nthMove = nthMove;
            state.winnerId = winnerId;
            state.boardState.board = boardState.board;
            state.boardState.size = boardState.size;
            state.boardState.winLength = boardState.winLength;
            state.lastMove = lastMove;
            state.isGameStarted = isGameStated;
        },

        addMove: (state, action) => {
            state.lastMove = action.payload;
        },

        resetGame: (state) => {
            state.winnerId = null;
            state.moves = [];
            state.lastMove = null;
            state.isGameStarted = false;
            state.startPlayerId = null;
            state.nthMove = 0;
            state.boardState = {
                board: [],
                size: 16,
                winLength: 5,
            };
        },

        setWinner: (state, action) => {
            state.winnerId = action.payload;
        },

        setIsGameStarted: (state, action) => {
            state.isGameStarted = action.payload;
        },
        setBoard: (state, action) => {
            state.boardState.board = action.payload;
        },
        setPlayerTimeInfo1: (state, action) => {
            state.playerTimeInfo1.remainTime = action.payload.remainTime;
            state.playerTimeInfo1.remainMoveDuration = action.payload.remainMoveDuration;
            state.playerTimeInfo1.playedTime = action.payload.playedTime;
        },
        setPlayerTimeInfo2: (state, action) => {
            state.playerTimeInfo2.remainTime = action.payload.remainTime;
            state.playerTimeInfo2.remainMoveDuration = action.payload.remainMoveDuration;
            state.playerTimeInfo2.playedTime = action.payload.playedTime;
        },
        resetGameConfig: (state) => {
            state.gameConfig.totalTime = 0;
            state.gameConfig.moveDuration = 0;
            state.gameConfig.firstMoveOption = null;
        },
        setGameConfig: (state, action) => {
            state.gameConfig.totalTime = action.payload.totalTime;
            state.gameConfig.moveDuration = action.payload.moveDuration;
            state.gameConfig.firstMoveOption = action.payload.firstMoveOption;
        },
        setIsPlayerTurn: (state, action) => {
            state.isPlayerTurn = action.payload;
        },
        setRemainMoveDuration1: (state, action) => {
            state.playerTimeInfo1.remainMoveDuration = action.payload;
        },
        setRemainMoveDuration2: (state, action) => {
            state.playerTimeInfo2.remainMoveDuration = action.payload;
        },

    }
});

export const { setGameState,
    addMove,
    resetGame,
    setWinner,
    setIsGameStarted,
    setBoard,
    setPlayerTimeInfo1,
    setPlayerTimeInfo2,
    resetGameConfig,
    setGameConfig,
    setIsPlayerTurn,
    setRemainMoveDuration1,
    setRemainMoveDuration2,
} = gameSlice.actions;
export default gameSlice.reducer;