import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import styles from "../Sidebar/Sidebar.module.scss";
import { logout } from "../../store/slices/authSlice";
import AuthService from "../../services/auth.service";
import useProfile from "../../pages/Profile/UseProfile";
import PlayerProfile from "../../components/PlayerProfile/PlayerProfile";
import {getAvatarByName} from "../../utils/AvatarUtils";

const UserMenu = ({ user, onActiveSidebar, handleShowSidebar, isAdmin }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { playerProfile, isLoading, isShowProfile, showProfile, hideProfile } = useProfile();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        AuthService.logout();
        handleClose();
        handleShowSidebar();
    };

    const handleAccount = () => {
        navigate('/account');
        handleClose();
        handleShowSidebar();
    };

    const handleShowProfile = () => {
        showProfile(user.id);
        handleClose();
        handleShowSidebar();
    };

    return (
        <div className={styles.user_menu_wrapper}>

            <PlayerProfile
                playerProfile={playerProfile}
                isLoading={isLoading}
                isShowProfile={isShowProfile}
                toggleShowProfile={hideProfile}
            />
            <IconButton style={{ display: "block" }} className={styles.info__avatar} onClick={handleClick}>
                <Avatar src={getAvatarByName(user?.avatar)} alt="avatar" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {
                    isAdmin && <MenuItem onClick={() => navigate("/admin")}>Trang quản trị</MenuItem>
                }
                <MenuItem onClick={handleAccount}>Tài khoản của tôi</MenuItem>
                <MenuItem onClick={handleShowProfile}>Hồ sơ của tôi</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <div className={`${styles.info_user} ${onActiveSidebar ? "" : styles.un_active}`}>
                <div className={styles.info__name}>
                    <span>{user.name}</span>
                </div>
                <div className={styles.info__coin}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <span>{user.score}</span>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;