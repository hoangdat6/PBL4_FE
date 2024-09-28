import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import darkModeReducer from './slices/darkModeSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        darkMode: darkModeReducer,
    },
});

export default store;
