import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import darkModeReducer from './slices/darkModeSlice';
import gameSlice from "./slices/gameSlice";
import authSlice from "./slices/authSlice";
import RoomSlice from "./slices/roomSlice";
import userPlaySlice from "./slices/userPlaySlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        darkMode: darkModeReducer,
        game: gameSlice,
        auth: authSlice,
        room: RoomSlice,
        user: userPlaySlice,
    },
});

export default store;
