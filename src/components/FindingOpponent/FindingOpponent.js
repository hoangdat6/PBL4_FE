import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './FindingOpponent.module.scss';

const FindingOpponent = ({ timer }) => {
    return (
        <div className={styles.container}>
            <CircularProgress color="inherit" size={60} />
            <h2 className={styles.heading}>Đang tìm một người chơi ngẫu nhiên...</h2>
            <p className={styles.subheading}>
                {timer > 0
                    ? `Thời gian dự kiến còn lại: ${timer} giây.`
                    : 'Quá trình có thể mất thêm vài giây nữa. Vui lòng chờ!'}
            </p>
        </div>
    );
};

export default FindingOpponent;
