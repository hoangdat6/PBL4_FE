import React, {useEffect, useState} from 'react';
import styles from './Sidebar.module.scss';
import useSidebar from "../../hooks/useSidebar";
import useOverlay from "../../hooks/useOverlay/useOverlay";
import SignInSignUp from "../../pages/AuthPage/SignInSignUp";
import CreateRoomPage from "../../pages/CreateRoomPage/ConfigGamePage";
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "../SignInSignUp/UserMenu";
import {useNavigate} from "react-router-dom";
import UserService from "../../services/user.service";
import {logout} from "../../store/slices/authSlice";
import useProfile from "../../pages/Profile/UseProfile";
import PlayerProfile from "../PlayerProfile/PlayerProfile";

const Sidebar = ({layout = "user"}) => {
    const {toggleOverlay, Overlay} = useOverlay();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {playerProfile, isLoading, isShowProfile, showProfile, hideProfile} = useProfile();

    const {
        handleShowSidebar,
        handleToggleSidebar,
        isShowSidebar,
        isSidebarActive,
    } = useSidebar();

    const handleCreateRoom = async () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (isAuthenticated) {
            UserService.getInfo().then((res) => {
                setUser(res.data);
            }).catch((err) => {
                dispatch(logout());
            });
        }
    }, [isAuthenticated]);


    const handleShowProfile = () => {
        showProfile(user.id);
        handleShowSidebar();
    };

    const navigateTo = (path) => {
        navigate(path);
        handleShowSidebar();
    }

    if (layout === "admin") {
        return (
            <nav
                className={`${styles.sidebar} ${isSidebarActive ? "" : styles.un_active} ${isShowSidebar ? styles.is_open : styles.is_close}`}>
                <div className={`${styles.sidebar__container} d-md-flex flex-column`}>
                    <div className={`${styles.sidebar__header}`}>
                        {isAuthenticated ? (
                            <div
                                className={`${styles.sidebar__login} ${styles.info} ${isSidebarActive ? "" : styles.un_active}`}>
                                <UserMenu user={user} onActiveSidebar={isSidebarActive}
                                          handleShowSidebar={handleShowSidebar}
                                          isAdmin={true}
                                />

                                <div className={`${styles.sidebar__menu_cta}`}>
                                    <div className={`${styles.sidebar__menu_cta_item}`}>
                                        <button>
                                            <i className="fa-regular fa-bell"></i> {/* Giữ lại icon thông báo */}
                                        </button>
                                    </div>
                                    <div className={`${styles.sidebar__menu_cta_item}`}>
                                        <button
                                            onClick={handleToggleSidebar}
                                        >
                                            <i className="fa-solid fa-bars"></i> {/* Thay bằng icon sidebar */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
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
                                            <i className="fa-regular fa-bell"></i>
                                        </button>
                                    </div>
                                    <div className={`${styles.sidebar__menu_cta_item}`}>
                                        <button
                                            onClick={handleToggleSidebar}
                                        >
                                            <i className="fa-solid fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className={`${styles.sidebar__menu}`}>

                        <nav className={`${styles.sidebar__nav}`}>
                            <div className={`${styles.sidebar__nav_item}`} title="Trang chủ">
                                <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                        onClick={() => navigateTo('/')}
                                >
                                    <div className={`${styles.sidebar__nav_icon}`}>
                                        <i className="fa-solid fa-house"></i> {/* Icon cho trang chủ */}
                                    </div>
                                    <span className={`${styles.sidebar__nav_text}`}> Trang chủ </span>
                                </button>
                            </div>
                        </nav>

                        <nav className={`${styles.sidebar__nav}`}>
                            <div className={`${styles.sidebar__nav_item}`} title="Thống kê mùa giải ">
                                <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                        onClick={() => navigateTo('/admin/season-stats')}
                                >
                                    <div className={`${styles.sidebar__nav_icon}`}>
                                        <i className="fa-solid fa-chart-line"></i> {/* Icon cho thống kê */}
                                    </div>
                                    <span className={`${styles.sidebar__nav_text}`}> Thống kê mùa giải </span>
                                </button>
                            </div>

                            <div className={`${styles.sidebar__nav_item}`} title="Danh sách người chơi">
                                <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                        onClick={() => navigateTo('/admin/player-list')}
                                >
                                    <div className={`${styles.sidebar__nav_icon}`}>
                                        <i className="fa-solid fa-users"></i> {/* Icon cho danh sách người chơi */}
                                    </div>
                                    <span className={`${styles.sidebar__nav_text}`}> Danh sách người chơi </span>
                                </button>
                            </div>

                            <div className={`${styles.sidebar__nav_item}`} title="Danh sách phòng chơi">
                                <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                        onClick={() => navigateTo('/admin/match-list')}
                                >
                                    <div className={`${styles.sidebar__nav_icon}`}>
                                        <i className="fa-solid fa-gamepad"></i> {/* Icon cho danh sách phòng chơi */}
                                    </div>
                                    <span className={`${styles.sidebar__nav_text}`}> Danh sách phòng chơi </span>
                                </button>
                            </div>


                        </nav>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav
            className={`${styles.sidebar} ${isSidebarActive ? "" : styles.un_active} ${isShowSidebar ? styles.is_open : styles.is_close}`}>
            <SignInSignUp Overlay={Overlay} toggleOverlay={toggleOverlay}/>
            {
                isOpen && <CreateRoomPage isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
            <div
                className={`${styles.sidebar__overlay} `}
                onClick={handleShowSidebar}
            ></div>

            <PlayerProfile
                playerProfile={playerProfile}
                isLoading={isLoading}
                isShowProfile={isShowProfile}
                toggleShowProfile={hideProfile}
            />
            <div className={`${styles.sidebar__container} d-md-flex flex-column`}>
                <div className={`${styles.sidebar__header}`}>
                    {isAuthenticated ? (
                        <div
                            className={`${styles.sidebar__login} ${styles.info} ${isSidebarActive ? "" : styles.un_active}`}>
                            <UserMenu user={user} onActiveSidebar={isSidebarActive}
                                      handleShowSidebar={handleShowSidebar}/>

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
                    ) : (
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
                    )}

                </div>

                <div className={`${styles.sidebar__menu}`}>
                    <nav className={`${styles.sidebar__nav}`}>

                        {/*<div className={`${styles.sidebar__nav_item}`} title="Bạn bè">*/}
                        {/*    <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}*/}
                        {/*            onClick={() => navigateTo('/friends')}*/}
                        {/*    >*/}
                        {/*        <div className={`${styles.sidebar__nav_icon}`}>*/}
                        {/*            <i className="fa-solid fa-user-group"></i>*/}
                        {/*        </div>*/}
                        {/*        <span className={`${styles.sidebar__nav_text}`}> Bạn bè </span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        <div className={`${styles.sidebar__nav_item}`} title="Lịch sử">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                    onClick={() => navigateTo('/history')}
                            >
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Lịch sử </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Bảng xếp hạng">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                    onClick={() => navigateTo('/leaderboard')}
                            >
                                <div className={`${styles.sidebar__nav_icon}`}>
                                <i className="fa-solid fa-trophy"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Bảng xếp hạng </span>
                            </button>
                        </div>
                    </nav>
                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Trang chủ">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                    onClick={() => navigateTo('/')}
                            >
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-user-group"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Trang chủ </span>
                            </button>
                        </div>
                    </nav>
                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Chơi trực tuyến">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                    onClick={() => navigateTo('/find-opponent')}
                            >
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-earth-americas"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Chơi trực tuyến </span>
                            </button>
                        </div>
                        <div className={`${styles.sidebar__nav_item}`} title="Đấu với máy">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                    onClick={() => navigateTo('/b/room')}
                            >
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
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        <div className={`${styles.sidebar__nav_item}`} title="Luật chơi">
                            <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                    onClick={() => navigateTo('/rules')}
                            >
                                <div className={`${styles.sidebar__nav_icon}`}>
                                    <i className="fa-solid fa-book-tanakh"></i>
                                </div>
                                <span className={`${styles.sidebar__nav_text}`}> Luật chơi </span>
                            </button>
                        </div>
                    </nav>

                    <nav className={`${styles.sidebar__nav}`}>
                        {isAuthenticated && (
                            <>
                                <div className={`${styles.sidebar__nav_item}`} title="Tài khoản của tôi">
                                    <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                            onClick={() => navigateTo('/account')}
                                    >
                                        <div className={`${styles.sidebar__nav_icon}`}>
                                            <i className="fa-thin fa-user"></i>
                                        </div>
                                        <span className={`${styles.sidebar__nav_text}`}> Tài khoản của tôi </span>
                                    </button>
                                </div>
                                <div className={`${styles.sidebar__nav_item}`} title="Hồ sơ của tôi">
                                    <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}
                                            onClick={handleShowProfile}
                                    >
                                        <div className={`${styles.sidebar__nav_icon}`}>
                                            <i className="fa-solid fa-link"></i>
                                        </div>
                                        <span className={`${styles.sidebar__nav_text}`}> Hồ sơ của tôi </span>
                                    </button>
                                </div>
                            </>
                        )
                        }

                        {/*<div className={`${styles.sidebar__nav_item}`} title="Cài đặt">*/}
                        {/*    <button className={`${styles.sidebar__nav_link} d-flex align-items-center`}*/}
                        {/*            onClick={() => navigateTo('/settings')}*/}
                        {/*    >*/}
                        {/*        <div className={`${styles.sidebar__nav_icon}`}>*/}
                        {/*            <i className="fa-solid fa-gear"></i>*/}
                        {/*        </div>*/}
                        {/*        <span className={`${styles.sidebar__nav_text}`}> Cài đặt </span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
