import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

// Thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_CARO_BE_API_URL}/api/login`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            Cookies.set('userId', JSON.stringify(response.data), { expires: 7 });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userId = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, initialize } = authSlice.actions;
export default authSlice.reducer;