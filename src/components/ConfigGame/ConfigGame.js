import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    Button
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './ConfigGame.scss';
import {FirstMoveOption} from "../../enums/FirstMoveOption";

const ConfigGame = ({ isOpen, setIsOpen,  turnTime, setTurnTime, totalTime, setTotalTime, firstPlayer, setFirstPlayer, handleCreateRoom }) => (
    <Dialog open={isOpen} className="dialog-container">
        <DialogTitle>
            Chơi với một người bạn
            <IconButton
                aria-label="close"
                onClick={() => setIsOpen(false)}
                className="close-button"
            >
                &times;
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <FormControl fullWidth>
                <InputLabel>Thời gian mỗi lượt</InputLabel>
                <Select value={turnTime} onChange={(e) => setTurnTime(e.target.value)}>
                    <MenuItem value="10">10 giây</MenuItem>
                    <MenuItem value="20">20 giây</MenuItem>
                    <MenuItem value="30">30 giây</MenuItem>
                    <MenuItem value="40">40 giây</MenuItem>
                    <MenuItem value="0">Không giới hạn</MenuItem>
                </Select>
                <Tooltip title="Thời gian mỗi lượt cho người chơi" placement="top">
                    <HelpOutlineIcon />
                </Tooltip>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Số phút cho mỗi người chơi</InputLabel>
                <Select value={totalTime} onChange={(e) => setTotalTime(e.target.value)} defaultValue={"5"}>
                    <MenuItem value="60">1 phút</MenuItem>
                    <MenuItem value="120">2 phút</MenuItem>
                    <MenuItem value="180">3 phút</MenuItem>
                    <MenuItem value="240">4 phút</MenuItem>
                    <MenuItem value="300">5 phút</MenuItem>
                    <MenuItem value="0">Không giới hạn</MenuItem>
                </Select>
                <Tooltip title="Thời gian tổng cộng cho mỗi người chơi" placement="top">
                    <HelpOutlineIcon />
                </Tooltip>
            </FormControl>

            <Button variant="outlined">
                Điều khiển thời gian tùy chỉnh
            </Button>

            <FormControl fullWidth>
                <InputLabel>Ai chơi trước?</InputLabel>
                <Select value={firstPlayer} onChange={(e) => setFirstPlayer(e.target.value)}>
                    <MenuItem value={FirstMoveOption.RANDOM} selected={true}>Ngẫu nhiên</MenuItem>
                    <MenuItem value={FirstMoveOption.ROOM_OWNER}>Tôi chơi trước</MenuItem>
                    <MenuItem value={FirstMoveOption.GUEST}>Đối thủ chơi trước</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={handleCreateRoom}>
                Tiếp tục
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfigGame;
