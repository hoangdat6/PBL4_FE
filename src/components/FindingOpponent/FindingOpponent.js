import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './FindingOpponent.module.scss';

const FindingOpponent = () => {
    return (
        <div className={styles.container}>
            <CircularProgress color="inherit" size={60} />
            <h2 className={styles.heading}>Đang tìm một người chơi ngẫu nhiên...</h2>
            <p className={styles.subheading}>Quá trình này thường mất 30 giây...</p>
        </div>
    );
};

export default FindingOpponent;
