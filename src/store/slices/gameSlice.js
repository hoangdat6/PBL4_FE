import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    roomCode: null,
    isInRoom: false,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        joinRoom(state, action) {
            state.roomCode = action.payload.roomCode;
            state.isInRoom = true;
        },
        leaveRoom(state) {
            state.roomCode = null;
            state.isInRoom = false;
        },
    }
});

export const { joinRoom, leaveRoom } = gameSlice.actions;
export default gameSlice.reducer;