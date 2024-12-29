import React from "react";
import styles from "./AccountSettings.module.scss";

const AccountSettings = ({ accountInfo, isSaving, onChange, onUpdate, onDelete }) => {
    return (
        <div className={styles.accountSettings}>
            <h2 className={styles.title}>Tài khoản của tôi</h2>
            <div className={styles.form}>
                <div className={styles.field}>
                    <label>Tên hiển thị</label>
                    <input
                        type="text"
                        name="name"
                        value={accountInfo.name}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.field} >
                    <label>Địa chỉ email</label>
                    <input
                        type="email"
                        name="email"
                        value={accountInfo.email}
                        onChange={onChange}
                        disabled
                    />
                </div>
                <button
                    className={styles.updateButton}
                    onClick={onUpdate}
                    disabled={isSaving}
                >
                    {isSaving ? "Đang cập nhật..." : "Cập nhật"}
                </button>
            </div>
            <div className={styles.deleteSection}>
                <h3>Xóa tài khoản</h3>
                <p>
                    Việc xóa tài khoản sẽ xóa vĩnh viễn tài khoản, giải đấu, trò chơi, thứ
                    hạng và email tiếp thị của bạn. Không thể hoàn tác hành động này.
                </p>
                <button className={styles.deleteButton} onClick={onDelete}>
                    Xóa tài khoản
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;