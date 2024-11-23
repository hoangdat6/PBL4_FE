import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name: 'userPlay',
    initialState: {
        playingRoom: null,
        currentRoom: null,
    },
    reducers: {
        setPlayingRoom: (state, action) => {
            state.playingRoom = action.payload;
        },
        setCurrentRoom: (state, action) => {
            state.currentRoom = action.payload;
        },
    }
});

export const { setPlayingRoom,
    setCurrentRoom
} = roomSlice.actions;
export default roomSlice.reducer;
