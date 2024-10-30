import React, { useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './WaitingRoom.module.scss';
import { useSnackbar } from "../../hooks/useSnackbar";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const WaitingRoom = ({roomCode, handleLeaveRoom}) => {
    const { open, message, autoHideDuration, openSnackbar, closeSnackbar } = useSnackbar();
    const roomLink = `${window.location.origin}/room/${roomCode}`;

    const handleCopyLink = useCallback(() => {
        navigator.clipboard.writeText(roomLink);
        openSnackbar('Link copied to clipboard!', 3000);
    }, [roomLink, openSnackbar]);

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (
        <div className={styles.c_waitingRoomContainer}>
            <h2 className={styles.c_title}>Chia sẻ liên kết này với một người bạn</h2>
            <div className={styles.c_linkContainer}>
                <span
                    type="text"
                    readOnly
                    className={styles.c_roomLink}
                >
                    {roomLink}
                </span>

                <button onClick={handleCopyLink} className={styles.c_copyButton}>
                    <span role="img" aria-label="copy">📋</span>
                </button>
                <Snackbar
                    open={open}
                    autoHideDuration={autoHideDuration}
                    onClose={closeSnackbar}
                    message={message}
                    action={action}
                />
            </div>
            <div className={styles.c_qrCodeContainer}>
                <QRCodeSVG value={roomLink} size={200} />
            </div>

            {/* Nút rời khỏi phòng */}
            <button className={styles.c_leaveButton} onClick={handleLeaveRoom}>
                Rời khỏi phòng
            </button>
        </div>
    );
};

export default WaitingRoom;
