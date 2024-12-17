import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: '',
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userId = '';
            state.isAuthenticated = false;
            Cookies.remove('userId');
        },
        initialize: (state) => {
            const userId = JSON.parse(Cookies.get('userId') || null);
            if (userId) {
                state.userId = userId;
                state.isAuthenticated = true;
            }
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
            state.isAuthenticated = true;
            Cookies.set('userId', JSON.stringify(action.payload));
        },
        setError : (state, action) => {
            state.error = action.payload;
        },
    }

});

export const { logout, initialize, setUserId, setError } = authSlice.actions;
export default authSlice.reducer;