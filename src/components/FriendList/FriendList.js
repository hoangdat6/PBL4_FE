import React from "react";
import styles from "./FriendList.module.scss";

const FriendList = ({ friends, friendRequests }) => {
    return (
        <div className={styles.friendListWrapper}>
            <div className={styles.friendList}>
                <div className={styles.header}>Bạn bè</div>

                {/* Friend Requests Box */}
                {friendRequests.length > 0 && (
                    <div className={styles.friendRequests}>
                        <div className={styles.requestsHeader}>Yêu cầu kết bạn</div>
                        <div className={styles.requestsList}>
                            {friendRequests.map((request, index) => (
                                <div key={index} className={styles.requestItem}>
                                    <div className={styles.requestInfo}>
                                        <img
                                            src={request.avatar || "/default-avatar.png"}
                                            alt={request.name}
                                            className={styles.avatar}
                                        />
                                        <div className={styles.name}>{request.name}</div>
                                    </div>
                                    <div className={styles.actions}>
                                        <button className={styles.acceptButton}>Accept</button>
                                        <button className={styles.rejectButton}>Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Friend List */}
                <div className={styles.list}>
                    <div className={styles.requestsHeader}>Bạn bè</div>
                    {friends.length > 0 ? (
                        friends.map((friend, index) => (
                            <div key={index} className={styles.friendItem}>
                                <div className={styles.friendInfo}>
                                    <img
                                        src={friend.avatar || "/default-avatar.png"}
                                        alt={friend.name}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.info_wrapper}>
                                        <div className={styles.name}>
                                            {friend.name}{" "}
                                            {friend.countryFlag && (
                                                <img
                                                    src={friend.countryFlag}
                                                    alt={`${friend.name}'s country`}
                                                    className={styles.flag}
                                                />
                                            )}
                                        </div>
                                        <div className={styles.time}>{friend.lastActive}</div>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <div className={styles.btn_wrapper}>
                                        <button className={styles.button}>Challenge</button>
                                        <button className={styles.button}>Send message</button>
                                    </div>
                                    <button className={styles.moreButton}>...</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>No friends found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendList;
