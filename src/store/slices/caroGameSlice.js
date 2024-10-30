import { createSlice } from '@reduxjs/toolkit';
import CaroGame from '../../models/CaroGame';

const caroGameSlice = createSlice({
    name: 'caroGame',
    initialState: {
        roomCode: null,
        startPlayerId: null,
        nthMove: 0,
        boardState: {
            board: [],
            size: 16,
            winLength: 5,
        },
        lastMove: null,
    },
    reducers: {
        setGameState: (state, action) => {
            const { roomCode, startPlayerId, nthMove, boardState } = action.payload;
            state.roomCode = roomCode;
            state.startPlayerId = startPlayerId;
            state.nthMove = nthMove;
            state.boardState = boardState;
        },
        setRoomCode: (state, action) => {
            state.roomCode = action.payload;
        }
        ,
        addMove: (state, action) => {
            state.lastMove = action.payload;
        },
        resetGame: (state) => {
            state.gameState = null;
        },
    },
});

export const { setGameState, setRoomCode,  addMove, resetGame,  } = caroGameSlice.actions;
export default caroGameSlice.reducer;
