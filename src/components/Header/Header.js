import React from 'react';
import styles from './Header.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {showSidebar} from "../../store/slices/sidebarSlice";
import useOverlay from "../../hooks/useOverlay/useOverlay";
import RoomCodePopup from "../RoomCodePopup/RoomCodePopup";
import {toggleDarkMode} from "../../store/slices/darkModeSlice";

const Header = ({layout = "user"}) => {
    const {toggleOverlay, Overlay} = useOverlay();
    const isDarkMode = useSelector(state => state.darkMode.isDarkMode);


    const dispatch = useDispatch();

    const handleOpenSidebar = () => {
        dispatch(showSidebar());
    }

    const handleChangeDarkMode = () => {
        dispatch(toggleDarkMode());
    }

    if (layout === 'admin') {
        return (
            <header className={`${styles.c_header}`}>
                <div className={`${styles.c_header__container}`}>
                    <div
                        className={`${styles.c_header__menu_icon}`}
                        onClick={handleOpenSidebar}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className={`d-flex`}>
                        <div
                            className={`${styles.c_header__dark_mode}`}
                            onClick={handleChangeDarkMode}
                        >
                            <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
                        </div>
                    </div>
                </div>
            </header>
        )

    }

    return (
        <header className={`${styles.c_header}`}>
            {/*<ToastContainer />*/}
            <Overlay
                closeHidden={true}
                overlayClickHidden={false}
            >
                <RoomCodePopup
                    toggleOverlay={toggleOverlay}
                />
            </Overlay>

            <div className={`${styles.c_header__container}`}>
                <div
                    className={`${styles.c_header__menu_icon}`}
                    onClick={handleOpenSidebar}
                >
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={`d-flex`}>
                    <div className={`${styles.c_header__actions}`}>
                        <div className={`${styles.c_header__action_item}`}>
                            <a href="#!" className="caro_btn btn_primary"
                               onClick={toggleOverlay}
                            >
                                <i className="fa-regular fa-keyboard"></i>
                                Nhập code
                            </a>
                        </div>
                        <div className={`${styles.c_header__action_item}`}>
                            <a href="#!" className="caro_btn btn_secondary"
                            >
                                <i className="fa-regular fa-user"></i>
                                Tìm trận
                            </a>
                        </div>
                    </div>
                    <div
                        className={`${styles.c_header__dark_mode}`}
                        onClick={handleChangeDarkMode}
                    >
                        <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
