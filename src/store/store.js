import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import darkModeReducer from './slices/darkModeSlice';
import gameSlice from "./slices/gameSlice";
import authSlice from "./slices/authSlice";
import RoomSlice from "./slices/RoomSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        darkMode: darkModeReducer,
        game: gameSlice,
        auth: authSlice,
        room: RoomSlice
    },
});

export default store;
