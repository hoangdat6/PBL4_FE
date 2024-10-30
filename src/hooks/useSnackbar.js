import { useState, useCallback } from 'react';

export const useSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [autoHideDuration, setAutoHideDuration] = useState(6000);

    const openSnackbar = useCallback((newMessage, duration = 6000) => {
        setMessage(newMessage);
        setAutoHideDuration(duration);
        setOpen(true);
    }, []);

    const closeSnackbar = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    return {
        open,
        message,
        autoHideDuration,
        openSnackbar,
        closeSnackbar,
    };
};
