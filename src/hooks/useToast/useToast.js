import { useState } from 'react';
import styles from './useToast.module.scss';

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = ({ title = '', message = '', type = 'info', duration = 5000 }) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts([...toasts, { id, title, message, type, duration }]);

        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
        }, duration);
    };

    return {
        showSuccessToast: (title, message) => showToast({ title, message, type: 'success', duration: 5000 }),
        showErrorToast: (title, message) => showToast({ title, message, type: 'error', duration: 50000 }),
        showInfoToast: (title, message) => showToast({ title, message, type: 'info', duration: 5000 }),
        showWarningToast: (title, message) => showToast({ title, message, type: 'warning', duration: 5000 }),
        ToastContainer: () => (
            <div className={styles.toastContainer}>
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
            </div>
        ),
    };
};

// Toast Component
const Toast = ({ id, title, message, type }) => {
    const icons = {
        success: "fa-sharp fa-solid fa-circle-check",
        error: "fa-solid fa-circle-exclamation",
        info: "fa-solid fa-circle-info",
        warning: "fa-solid fa-circle-exclamation",
    };

    return (
        <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
            <div className={styles.toast_icon}>
                <i className={icons[type]}></i>
            </div>
            <div className={styles.toast_body}>
                <h3 className={styles.toast_title}>{title}</h3>
                <p className={styles.toast_msg}>{message}</p>
            </div>
            <div className={styles.toast_close}>&times;</div>
        </div>
    );
};
