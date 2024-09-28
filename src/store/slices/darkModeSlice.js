import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        isDarkMode: JSON.parse(sessionStorage.getItem('isDarkMode')) ?? true,  // Sử dụng '??' để xử lý 'null'
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;  // Thay đổi giá trị trước
            if (state.isDarkMode) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
            sessionStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        },
    },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
