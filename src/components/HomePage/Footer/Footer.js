import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    return (<footer className={styles.footer}>
            <div className={styles.footer__content}>
                {/* Phần Trò chơi */}
                {/*<div className={styles.footer__section}>*/}
                {/*    <h4>Trò chơi</h4>*/}
                {/*    <ul>*/}
                {/*        <li>Battleship</li>*/}
                {/*        <li>Tic Tac Toe</li>*/}
                {/*        <li>Connect 4</li>*/}
                {/*        <li>Caro</li>*/}
                {/*        <li>Cờ vua</li>*/}
                {/*        <li>Card Games</li>*/}
                {/*        <li>Solitaire</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                {/* Phần Theo dõi chúng tôi */}
                <div className={styles.footer__section}>
                    <h4>Theo dõi chúng tôi</h4>
                    <ul>
                        <li><a href="https://discord.com">Discord</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://youtube.com">YouTube</a></li>
                        <li><a href="https://instagram.com">Instagram</a></li>
                    </ul>
                </div>

                {/* Phần Tài nguyên */}
                <div className={styles.footer__section}>
                    <h4>Tài nguyên</h4>
                    <ul>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#developer">Nhà phát triển</a></li>
                        <li><a href="#api">API</a></li>
                        <li><a href="#privacy">Quyền riêng tư</a></li>
                        <li><a href="#terms">Điều khoản & Điều kiện</a></li>
                    </ul>
                </div>

                {/* Phần Liên hệ */}
                <div className={styles.footer__section}>
                    <h4>Liên hệ</h4>
                    <ul>
                        <li>
                            <p>example@gmail.com</p>
                        </li>
                        <li>
                            <p>Da Nang, Viet Nam</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Phần bản quyền */}
            <div className={styles.footer__copyright}>
                <p>© 2024 Caro Arena. All rights reserved.</p>
            </div>
        </footer>);
};

export default Footer;
