import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from "../Sidebar/Sidebar.module.scss";
import {logout} from "../../store/slices/authSlice";
import {useDispatch} from "react-redux";

const UserMenu = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
    };

    const handleAccount = () => {
        navigate('/account');
        handleClose();
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar src="https://i.pravatar.cc/150?img=68" alt="avatar" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleAccount}>Tài khoản của tôi</MenuItem>
                <MenuItem onClick={handleProfile}>Hồ sơ của tôi</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <div className={`${styles.info_user}`}>
                <div className={`${styles.info__name}`}>
                    <span>{user.name}</span>
                </div>

                <div className={`${styles.info__coin}`}>
                    <i className="fa-solid fa-coins"></i>
                    <span>{user.coin}</span>
                </div>
            </div>
        </>
    );
};

export default UserMenu;