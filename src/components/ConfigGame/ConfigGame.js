import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Tooltip
} from '@mui/material';
import './ConfigGame.scss';
import {FirstMoveOption} from "../../enums/FirstMoveOption";

const ConfigGame = ({
                        isOpen,
                        setIsOpen,
                        moveDuration,
                        setMoveDuration,
                        totalTime,
                        setTotalTime,
                        firstPlayer,
                        setFirstPlayer,
                        handleCreateRoom
                    }) => {
    const [isCustomTime, setIsCustomTime] = useState(false);


    return (

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
                    {isCustomTime ? (
                            <>
                                <Input
                                    className={"input-custom"}
                                    onChange={(e) => setMoveDuration(e.target.value)}
                                    placeholder="Nhập số giây"
                                    value={moveDuration}
                                    type={"number"}
                                />
                                <span>Giây</span>
                            </>
                        ) :
                        (
                            <Select onChange={(e) => setMoveDuration(e.target.value)} defaultValue={moveDuration}>
                                <MenuItem value="10">10 giây</MenuItem>
                                <MenuItem value="20">20 giây</MenuItem>
                                <MenuItem value="30">30 giây</MenuItem>
                                <MenuItem value="40">40 giây</MenuItem>
                                {/*<MenuItem value="-1">Không giới hạn</MenuItem>*/}
                            </Select>
                        )
                    }
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Số phút cho mỗi người chơi</InputLabel>
                    {
                        isCustomTime ? (
                            <>
                                <Input className={"input-custom"} onChange={(e) => setTotalTime(e.target.value)} placeholder="Nhập số phút" value={totalTime}
                                       type={"number"}
                                />
                                <span>Phút</span>
                            </>
                        ) : (
                            <Select onChange={(e) => setTotalTime(e.target.value)} defaultValue={totalTime}>
                                <MenuItem value="1">1 phút</MenuItem>
                                <MenuItem value="2">2 phút</MenuItem>
                                <MenuItem value="3">3 phút</MenuItem>
                                <MenuItem value="4">4 phút</MenuItem>
                                <MenuItem value="5">5 phút</MenuItem>
                                {/*<MenuItem value="-1">Không giới hạn</MenuItem>*/}
                            </Select>
                        )
                    }

                    {/*<Tooltip title="Thời gian tổng cộng cho mỗi người chơi" placement="top">*/}
                    {/*    <HelpOutlineIcon/>*/}
                    {/*</Tooltip>*/}
                </FormControl>

                <Button variant="outlined"
                        onClick={() => setIsCustomTime(!isCustomTime)}
                >
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
        </Dialog>)
};

export default ConfigGame;
