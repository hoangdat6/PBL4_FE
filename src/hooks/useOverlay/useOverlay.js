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

    const Overlay = ({ children, width, height, closeHidden = true, overlayClickHidden = true, backColor = "rgba(255, 255, 255, 0.2)"}) => {
        return createPortal(
            <div
                id={`c_overlay`}
                {...(overlayClickHidden ? { onClick: toggleOverlay } : {})}
                className={`${styles.c_overlay} ${overlay ? styles.active : ""}`}
                style={{
                    backgroundColor: backColor
                }}
            >
                <div>
                    {!closeHidden &&
                        <FontAwesomeIcon
                            icon={faClose}
                            className={`${styles.close}`}
                            onClick={toggleOverlay}
                        />
                    }
                </div>
                <div
                    className={`${styles.overlay_content}`}
                    style={{ width, height }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>,
            document.body
        );
    };

    return { overlay, toggleOverlay, Overlay };
};

export default useOverlay;