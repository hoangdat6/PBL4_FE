import React from "react";
import { Link } from "react-router-dom";
import styles from "./RoomNotFound.module.scss";

const RoomNotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Phòng không tồn tại</h1>
            <p className={styles.message}>
                Có vẻ như phòng bạn đang tìm kiếm không tồn tại hoặc đã bị đóng.
            </p>
            <Link to="/" className={`${styles.button} caro_btn`}>
                Quay về trang chủ
            </Link>
        </div>
    );
};

export default RoomNotFound;
