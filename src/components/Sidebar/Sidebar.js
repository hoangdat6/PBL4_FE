import React from 'react';
import styles from './Sidebar.module.scss';
import useSidebar from "../../hooks/useSidebar";
import useOverlay from "../../hooks/useOverlay/useOverlay";
import SignInSignUp from "../LoginSignUp/SignInSignUp";

const Sidebar = () => {
    const { toggleOverlay, Overlay } = useOverlay();

    const {
        handleShowSidebar,
        handleToggleSidebar,
        isShowSidebar,
        isSidebarActive,
        // setLoginFormVisible,
        // isLoginFormVisible
    } = useSidebar();


    return (
        <nav
            className={`${styles.sidebar} ${isSidebarActive ? styles.un_active : ""}  ${isShowSidebar ? styles.is_open : styles.is_close}` }>
            <SignInSignUp Overlay={Overlay} toggleOverlay={toggleOverlay}/>
            <div
                className={`${styles.sidebar__overlay}`}
                onClick={handleShowSidebar}
            ></div>
            <div className={`${styles.sidebar__container} d-md-flex flex-column`}>
                <div className={`${styles.sidebar__header}`}>
                    <div className={`${styles.sidebar__login}`}>
                        <div className={`${styles.sidebar__login_link}`}>
                            <a
                                href="#!" className={`${styles.sidebar__login_link_text} caro_btn btn_primary`}
                                onClick={toggleOverlay}
                            >
                                <i className="fa-solid fa-user"></i> Đăng nhập
                            </a>
                        </div>
                        <div className={`${styles.sidebar__menu_cta}`}>
                            <div className={`${styles.sidebar__menu_cta_item}`}>
                                <a href="#!">
                                    <i className="fa-sharp fa-regular fa-bell"></i>
                                </a>
                            </div>
                            <div className={`${styles.sidebar__menu_cta_item}`}>
                                <a
                                    href="#!"
                                    onClick={handleToggleSidebar}
                                >
                                    <i className="fa-solid fa-sidebar"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.sidebar__menu}`}>
                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Bạn bè">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-user-group"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Bạn bè </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Lịch sử">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Lịch sử </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Bảng xếp hạng">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-trophy"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Bảng xếp hạng </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Nhắn tin">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-messages"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Nhắn tin </span>
                            </a>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Chơi trực tuyến">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-earth-americas"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Chơi trực tuyến </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Đấu với máy">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-user-robot"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Đấu với máy </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Chơi với bạn bè">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-people-arrows"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Chơi với bạn bè </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Tạo giải đấu">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Tạo giải đấu </span>
                            </a>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Luật chơi">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-book-tanakh"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Luật chơi </span>
                            </a>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Cửa hàng">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Cửa hàng </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Tài khoản của tôi">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-thin fa-user"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Tài khoản của tôi </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Hồ sơ của tôi">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-link"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Hồ sơ của tôi </span>
                            </a>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Cài đặt">
                            <a href="#!" className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-gear"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Cài đặt </span>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
