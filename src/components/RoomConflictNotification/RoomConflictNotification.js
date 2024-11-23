import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const RoomConflictNotification = ({ onLeaveRoom, onContinue }) => {
    return (
        <Dialog open={true} onClose={onContinue}>
            <DialogTitle>Xung đột phòng chơi</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Bạn đang chơi ở một phòng khác!</Typography>
                <Typography variant="body1">Bạn có muốn tiếp tục chơi phòng đó</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onLeaveRoom()} color="primary">
                    Không, rời phòng đó
                </Button>
                <Button onClick={onContinue} color="secondary">
                    Có, tiếp tục chơi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomConflictNotification;