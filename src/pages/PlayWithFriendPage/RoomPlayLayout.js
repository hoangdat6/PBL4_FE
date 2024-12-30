import styles from './RoomPlayLayout.module.scss';
import PlayerInfo from "../../components/CaroBoard/PlayerInfo/PlayerInfo";
import War from "../../assets/statics/imgs/war.svg";
import React from "react";

const RoomPlayLayout = ({ children, leftSide, rightSide, player1, player2, onLeaveRoom, isGameStarted, winner}) => {

    return (
        <div className={styles.layout_wrapper}>
            <div className={styles.left_side}>
                {isGameStarted && leftSide}
            </div>
            <div className={styles.center_side_wrapper}>
                <div className={styles.top_side}>
                    {isGameStarted && (
                        <>
                            <PlayerInfo {...player1} />
                            <div className={styles.vs_icon}>
                                <img src={War} alt="VS icon"/>
                            </div>
                            <PlayerInfo {...player2} />
                        </>
                    )}
                </div>
                <div className={styles.center_side}>
                    {children}
                </div>
                <div className={styles.bottom_side}>
                    {
                        isGameStarted && <button className={styles.leave_room} onClick={onLeaveRoom}>Rời phòng</button>
                    }
                </div>
            </div>
            <div className={styles.right_side}>
                {
                    isGameStarted && rightSide
                }
            </div>
        </div>
    );
}

export default RoomPlayLayout;