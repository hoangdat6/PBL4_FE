import { createSlice } from '@reduxjs/toolkit';

import ParticipantType from "../../enums/participantType";

const initialState = {
    roomCode: null,
    player1Info: {
        id: null,
        name: null,
        matchScore: 0,
        seasonScore: 0,
        avatar: null,
        checker: null,
        rank: null,
        isTurn: false,
    },
    player2Info: {
        id: null,
        name: null,
        matchScore: 0,
        seasonScore: 0,
        avatar: null,
        checker: null,
        rank: null,
        isTurn: false,
    },
    participantType: null,
    messages: [],
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        resetRoom: (state) => {
            state.roomCode = null;
            state.player1Info.id = null;
            state.player2Info.id = null;
            state.participantType = null;
        },

        setParticipantType: (state, action) => {
            state.participantType = action.payload === "PLAYER" ? ParticipantType.PLAYER : ParticipantType.SPECTATOR;
        },
        setRoomCode : (state, action) => {
            state.roomCode = action.payload;
        },
        setRoomState: (state, action) => {
            const {roomCode, playerId1, playerId2, messages} = action.payload;
            state.roomCode = roomCode;
            state.player1Info.id = playerId1;
            state.player2Info.id = playerId2;
            state.messages = messages;
        },
        setPlayer1Info: (state, action) => {
            state.player1Info.id = action.payload.id;
            state.player1Info.name = action.payload.name;
            state.player1Info.matchScore = action.payload.matchScore;
            state.player1Info.seasonScore = action.payload.seasonScore;
            state.player1Info.avatar = action.payload.avatar;
            state.player1Info.checker = action.payload.checker;
            state.player1Info.rank = action.payload.rank;
        },

        setPlayer2Info: (state, action) => {
            state.player2Info.id = action.payload.id;
            state.player2Info.name = action.payload.name;
            state.player2Info.matchScore = action.payload.matchScore;
            state.player2Info.seasonScore = action.payload.seasonScore;
            state.player2Info.avatar = action.payload.avatar;
            state.player2Info.checker = action.payload.checker;
            state.player2Info.rank = action.payload.rank;
        },
        setIsTurn: (state, action) => {
            state.player1Info.isTurn = action.payload;
            state.player2Info.isTurn = !action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const {
    setParticipantType,
    setRoomCode,
    resetRoom,
    setRoomState,
    setPlayer1Info,
    setPlayer2Info,
    setIsTurn,
    setMessages,
} = roomSlice.actions;
export default roomSlice.reducer;
