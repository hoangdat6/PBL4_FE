import React from "react";
import {Box, Avatar, Typography, Divider, Chip, IconButton} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./PlayerProfile.module.scss";
import {getAvatarByName} from "../../utils/AvatarUtils";


const PlayerProfile = ({playerProfile, isLoading, isShowProfile, toggleShowProfile}) => {

    const handleClose = () => {
        toggleShowProfile();
    };

    return (
        <Box className={`${styles.profileBox} ${isShowProfile ? styles.is_open : ""}`}>
            <IconButton onClick={handleClose} className={styles.closeButton}>
                <CloseIcon/>
            </IconButton>
            <Box className={`${styles.avatarContainer} ${isLoading ? styles.loadingWave : ''}`}>
                {isLoading ? <div className={styles.avatarPlaceholder}></div> :
                    <Avatar
                        src={getAvatarByName(playerProfile?.avatar)}
                        alt={playerProfile?.name} className={styles.avatar}/>
                }
            </Box>
            <Typography variant="h5" className={`${styles.name} ${isLoading ? styles.loadingWave : ''}`}>
                {isLoading ? <span className={styles.textPlaceholder}></span> : playerProfile?.name}
            </Typography>
            <Typography variant="body2" className={`${styles.registeredText} ${isLoading ? styles.loadingWave : ''}`}>
                {isLoading ?
                    <span className={styles.textPlaceholder}></span> : 'Tham gia từ ' + playerProfile?.dateJoined}
            </Typography>
            <Divider className={styles.divider}/>
            <Box className={styles.statsBox}>
                <Typography variant="h6" className={`${styles.statsTitle} ${isLoading ? styles.loadingWave : ''}`}>
                    {isLoading ? <span className={styles.textPlaceholder}></span> : 'Thống kê'}
                </Typography>
                <Box className={`${styles.statRow} ${isLoading ? styles.loadingWave : ''}`}>
                    <Typography variant="body2">Điểm:</Typography>
                    <Typography variant="body1">
                        {isLoading ? <span className={styles.textPlaceholder}></span> : playerProfile?.points}
                    </Typography>
                </Box>
                <Box className={`${styles.statRow} ${isLoading ? styles.loadingWave : ''}`}>
                    <Typography variant="body2">Xếp hạng:</Typography>
                    <Typography variant="body1">
                        {isLoading ? <span className={styles.textPlaceholder}></span> :
                            <Chip icon={<EmojiEventsIcon/>}
                                  label={playerProfile?.rank && playerProfile?.rank !== -1 ? `Rank ${playerProfile?.rank}` : `Chưa có`}
                                  size="small" color="primary" className={styles.chip}/>
                        }
                    </Typography>
                </Box>
                <Box className={`${styles.statRow} ${isLoading ? styles.loadingWave : ''} ${styles.wins}`}>
                    <Typography variant="body2">Wins:</Typography>
                    <Typography variant="body1">{isLoading ?
                        <span className={styles.textPlaceholder}></span> : playerProfile?.wins}</Typography>
                </Box>
                <Box className={`${styles.statRow} ${isLoading ? styles.loadingWave : ''} ${styles.draws}`}>
                    <Typography variant="body2">Hòa:</Typography>
                    <Typography variant="body1">{isLoading ?
                        <span className={styles.textPlaceholder}></span> : playerProfile?.draws}</Typography>
                </Box>
                <Box className={`${styles.statRow} ${isLoading ? styles.loadingWave : ''} ${styles.losses}`}>
                    <Typography variant="body2">Thua:</Typography>
                    <Typography variant="body1">{isLoading ?
                        <span className={styles.textPlaceholder}></span> : playerProfile?.losses}</Typography>
                </Box>
                <Box className={`${styles.statRow} ${isLoading ? styles.loadingWave : ''}`}>
                    <Typography variant="body2">Thời gian chơi:</Typography>
                    <Typography variant="body1">{isLoading ?
                        <span className={styles.textPlaceholder}></span> : playerProfile?.playTimes}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PlayerProfile;