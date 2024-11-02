import React, {useState} from 'react';
import styles from './Sidebar.module.scss';
import useSidebar from "../../hooks/useSidebar";
import useOverlay from "../../hooks/useOverlay/useOverlay";
import SignInSignUp from "../../pages/AuthPage/SignInSignUp";
import {useNavigate} from "react-router-dom";
import CreateRoomPage from "../../pages/CreateRoomPage/ConfigGamePage";

const Sidebar = () => {
    const { toggleOverlay, Overlay } = useOverlay();
    const [isOpen, setIsOpen] = useState(false);

    const {
        handleShowSidebar,
        handleToggleSidebar,
        isShowSidebar,
        isSidebarActive,
    } = useSidebar();

    const handleCreateRoom = async () => {
        setIsOpen(true);
    };

    return (
        <nav
            className={`${styles.sidebar} ${isSidebarActive ? styles.un_active : ""}  ${isShowSidebar ? styles.is_open : styles.is_close}` }>
            <SignInSignUp Overlay={Overlay} toggleOverlay={toggleOverlay}/>
            <CreateRoomPage isOpen={isOpen} setIsOpen={setIsOpen} />
            <div
                className={`${styles.sidebar__overlay}`}
                onClick={handleShowSidebar}
            ></div>
            <div className={`${styles.sidebar__container} d-md-flex flex-column`}>
                <div className={`${styles.sidebar__header}`}>
                    <div className={`${styles.sidebar__login}`}>
                        <div className={`${styles.sidebar__login_link}`}>
                            <button
                                className={`${styles.sidebar__login_link_text} caro_btn btn_primary`}
                                onClick={toggleOverlay}
                            >
                                <i className="fa-solid fa-user"></i> Đăng nhập
                            </button>
                        </div>
                        <div className={`${styles.sidebar__menu_cta}`}>
                            <div className={`${styles.sidebar__menu_cta_item}`}>
                                <button>
                                    <i className="fa-sharp fa-regular fa-bell"></i>
                                </button>
                            </div>
                            <div className={`${styles.sidebar__menu_cta_item}`}>
                                <button
                                    onClick={handleToggleSidebar}
                                >
                                    <i className="fa-solid fa-sidebar"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.sidebar__menu}`}>
                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Bạn bè">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-user-group"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Bạn bè </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Lịch sử">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Lịch sử </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Bảng xếp hạng">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-trophy"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Bảng xếp hạng </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Nhắn tin">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-messages"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Nhắn tin </span>
                            </button>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Chơi trực tuyến">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-earth-americas"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Chơi trực tuyến </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Đấu với máy">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-user-robot"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Đấu với máy </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Chơi với bạn bè">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                               onClick={handleCreateRoom}
                            >
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-people-arrows"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Chơi với bạn bè </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Tạo giải đấu">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Tạo giải đấu </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Tạo giải đấu">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Phòng hoạt động </span>
                            </button>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Luật chơi">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-book-tanakh"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Luật chơi </span>
                            </button>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Cửa hàng">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Cửa hàng </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Tài khoản của tôi">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-thin fa-user"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Tài khoản của tôi </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Hồ sơ của tôi">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-link"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Hồ sơ của tôi </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Cài đặt">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}>
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-gear"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Cài đặt </span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
