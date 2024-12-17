import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./useOverlay.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const useOverlay = () => {
    const [overlay, setOverlay] = useState(false);

    const toggleOverlay = () => {
        setOverlay(!overlay);
    };

    const Overlay = ({ children, width, height, closeHidden = false, overlayClickHidden = true, backColor = "rgba(0, 0, 0, 0.7)" }) => {
        return createPortal(
            <div
                id="c_overlay"
                {...(overlayClickHidden ? { onClick: toggleOverlay } : {})}
                className={`${styles.c_overlay} ${overlay ? styles.active : ""}`}
                style={{
                    backgroundColor: backColor,
                }}
            >
                <div
                    className={`${styles.overlay_content}`}
                    style={{ width, height }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {!closeHidden && (
                        <FontAwesomeIcon
                            icon={faClose}
                            className={styles.close}
                            onClick={toggleOverlay}
                        />
                    )}
                    {children}
                </div>
            </div>,
            document.body
        );
    };

    return { overlay, toggleOverlay, Overlay };
};

export default useOverlay;
