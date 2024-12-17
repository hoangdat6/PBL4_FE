// SpectatorList.jsx
import React from "react";
import styles from "./SpectatorList.module.scss";
import DefaultImage from "../../assets/statics/icon_avatar/Ghosty.png";

const SpectatorList = ({ spectators }) => {
    return (
        <div className={styles.spectatorList}>
            <div className={styles.header}>Spectators</div>
            <div className={styles.list}>
                {spectators.length > 0 ? (
                    spectators.map((spectator, index) => (
                        <div key={index} className={styles.spectatorItem}>
                            <img
                                src={spectator.avatar || DefaultImage} // Đường dẫn avatar
                                alt={spectator.name}
                                className={styles.avatar}
                            />
                            <span className={styles.name}>{spectator.name}</span>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>No spectators</div>
                )}
            </div>
        </div>
    );
};

export default SpectatorList;
