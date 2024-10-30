import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import darkModeReducer from './slices/darkModeSlice';
import gameSlice from "./slices/gameSlice";
import authSlice from "./slices/authSlice";
import caroGameSlice from "./slices/caroGameSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        darkMode: darkModeReducer,
        game: gameSlice,
        auth: authSlice,
        caroGame: caroGameSlice
    },
});

export default store;
