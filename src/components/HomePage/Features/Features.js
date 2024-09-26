import React from 'react';
import styles from './Features.module.scss';

const Features = () => {
    return (
        <section id="features" className={`${styles.features}`}>
            <h2>Key Features</h2>
            <div className={`${styles.features__list}`}>
                <div className={`${styles.feature}`}>
                    <h3>Create Rooms</h3>
                    <p>Create custom rooms and invite your friends for a friendly match.</p>
                </div>
                <div className={`${styles.feature}`}>
                    <h3>Play with AI</h3>
                    <p>Test your skills by playing against our intelligent AI.</p>
                </div>
                <div className={`${styles.feature}`}>
                    <h3>Compete Globally</h3>
                    <p>Join random matches with players around the world and rise through the ranks.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
