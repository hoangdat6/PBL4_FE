import React from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <section className={`${styles.hero}`}>
            <div className={`${styles.hero__content}`}>
                <h1>Chào mừng đến với Đấu trường Caro</h1>
                <p>Nền tảng tối ưu dành cho những người đam mê Caro. Chơi, cạnh tranh và giành chiến thắng!</p>
                <a href="#features" className={`${styles.hero__button} caro_btn btn_secondary`}>Xem thêm</a>
            </div>
        </section>
    );
};

export default Hero;
