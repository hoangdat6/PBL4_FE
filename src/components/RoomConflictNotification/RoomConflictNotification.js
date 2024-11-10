import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const RoomConflictNotification = ({ onLeaveRoom, onContinue }) => {
    return (
        <Dialog open={true} onClose={onContinue}>
            <DialogTitle>Room Conflict</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Bạn đang chơi ở một phòng khác!</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onLeaveRoom()} color="primary">
                    Rời phòng
                </Button>
                <Button onClick={onContinue} color="secondary">
                    Tiếp tục chơi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomConflictNotification;