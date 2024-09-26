import React from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <section className={`${styles.hero}`}>
            <div className={`${styles.hero__content}`}>
                <h1>Welcome to Caro Arena</h1>
                <p>The ultimate platform for Caro enthusiasts. Play, Compete, and Win!</p>
                <a href="#features" className={`${styles.hero__button}`}>Learn More</a>
            </div>
        </section>
    );
};

export default Hero;
