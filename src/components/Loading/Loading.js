import React, {useEffect, useState} from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingComponent = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'var(--color-primary)', // Tạo hiệu ứng che phủ mờ
            }}
        >
            <CircularProgress size={60} /> {/* Tùy chỉnh size nếu cần */}
        </Box>
    );
};


const Loading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Giả sử việc kết nối websocket hoặc xử lý dữ liệu
        const connectSocket = () => {
            setTimeout(() => {
                setLoading(false); // Sau khi kết nối xong thì tắt loading
            }, 3000); // Giả lập quá trình chờ
        };
        connectSocket();
    }, []);

    return (
        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                <div>Socket connection successful, now show the content!</div>
            )}
        </div>
    );
};


export default Loading;
