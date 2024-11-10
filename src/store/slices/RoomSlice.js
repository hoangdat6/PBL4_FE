import { createSlice } from '@reduxjs/toolkit';
import ParticipantType from "../../enums/participantType";

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomCode: null,
        startPlayerId: null,
        playerId1: null,
        playerId2: null,
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
        conflictRoomCode: null,
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
        setRoomConflict: (state, action) => {
            console.log(action.payload);
            state.conflictRoomCode = action.payload;
        },
        addMove: (state, action) => {
            state.lastMove = action.payload;
        },
        setBoard: (state, action) => {
            state.boardState.board = action.payload;
        },
        resetGame: (state) => {
            state.gameState = null;
        },
    },
});

export const { setGameState
    ,setRoomCode,
    addMove,
    resetGame,
    setRoomConfig,
    setParticipantType,
    setBoard,
    setRoomConflict
} = roomSlice.actions;
export default roomSlice.reducer;
