import React from "react";
import styles from "./MatchList.module.scss";
import DefaultAvatar from "../../../assets/statics/default_avatar/Glowface.png";
import {getAvatarByName} from "../../../utils/AvatarUtils";

const MatchList = ({ matches, onViewMatch }) => {
    if (!matches || matches.length === 0) {
        return <div className={styles.noData}>Hiện không có trận đấu nào đang diễn ra</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.matchList}>
                {matches.map((match, index) => (
                    <div className={styles.matchCardWrapper} key={index}>
                        <div className={styles.matchCard}>
                            <div className={styles.player}>
                                <div className={styles.avatar}>
                                    <img
                                        src={getAvatarByName(match.player1.avatar) || DefaultAvatar}
                                        alt="Player 1 Avatar"

                                    />
                                </div>
                                <span className={styles.playerName}>{match.player1.name}</span>
                            </div>
                            <div className={styles.score}>
                                {match.player1.score} - {match.player2.score}
                            </div>
                            <div className={styles.player}>
                                <div className={styles.avatar}>
                                    <img
                                        src={getAvatarByName(match.player2.avatar) || DefaultAvatar}
                                        alt="Player 1 Avatar"

                                    />
                                </div>
                                <span className={styles.playerName}>{match.player2.name}</span>
                            </div>
                        </div>
                        <div className={styles.btn_wrapper}>
                            <button
                                className={styles.viewButton}
                                onClick={() => onViewMatch(match)}
                            >
                                Xem trận đấu
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchList;
