import { createSlice } from '@reduxjs/toolkit';
import ParticipantType from "../../enums/participantType";

const caroGameSlice = createSlice({
    name: 'caroGame',
    initialState: {

        roomCode: null,
        startPlayerId: null,
        nthMove: 0,
        participantType: null,
        roomConfig: {
            timeLimitForMove: 0,
            timeLimitForMatch: 0,
            firstMoveOption: null,
        },
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
            state.lastMove = null;
        },
        setRoomConfig: (state, action) => {
            state.roomConfig.timeLimitForMove = action.payload.timeLimitForMove;
            state.roomConfig.timeLimitForMatch = action.payload.timeLimitForMatch;
            state.roomConfig.firstMoveOption = action.payload.firstMoveOption;
        },
        setParticipantType: (state, action) => {
            state.participantType = action.payload === "PLAYER" ? ParticipantType.PLAYER : ParticipantType.SPECTATOR;
        },
        setRoomCode: (state, action) => {
            state.roomCode = action.payload;
        },
        addMove: (state, action) => {
            state.lastMove = action.payload;
        },
        resetGame: (state) => {
            state.gameState = null;
        },
    },
});

export const { setGameState, setRoomCode,  addMove, resetGame, setRoomConfig,setParticipantType } = caroGameSlice.actions;
export default caroGameSlice.reducer;
