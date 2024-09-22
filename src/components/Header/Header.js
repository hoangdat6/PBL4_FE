import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={`${styles.c_header}`}>
            <div className={`${styles.c_header__container}`}>
                <div className={`${styles.c_header__menu_icon}`}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={`${styles.c_header__actions}`}>
                    <div className={`${styles.c_header__action_item}`}>
                        <a href="#!" className="caro_btn btn_primary">
                            <i className="fa-regular fa-keyboard"></i>
                            Nhập code
                        </a>
                    </div>
                    <div className={`${styles.c_header__action_item}`}>
                        <a href="#!" className="caro_btn btn_secondary">
                            <i className="fa-regular fa-user"></i>
                            Tìm trận
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
