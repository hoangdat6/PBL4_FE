import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebarActive: true,
    isShowSidebar: false
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar(state, action) {
            state.isSidebarActive = action.payload;
        },
        showSidebar(state) {
            state.isShowSidebar = !state.isShowSidebar;
        },
    }
});

export const { toggleSidebar, showSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
