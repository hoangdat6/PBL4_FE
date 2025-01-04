// theme/darkTheme.js
import { createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6eb5ff',      // Màu tím chủ đạo
            light: '#E2C0FF',      // Màu tím nhạt
            dark: '#3700B3',      // Màu tím đậm
        },
        background: {
            default: '#171821',  // Màu nền tối
            paper: '#1E1E1E'
        },
        text: {
            primary: '#ffffff',    // Màu chữ chính
            secondary: '#bdbdbd'
        },
        error: {
            main: '#f44336'    // Màu đỏ cho lỗi
        }
    },
    components:{
        MuiButton: {
            styleOverrides:{
                root:{
                    color: 'white'
                }
            }
        }
    }
});

export default darkTheme