import React from 'react';
import styles from './Features.module.scss';
const content = {
    en: {
        title: "Key Features",
        features: [
            {
                title: "Create Rooms",
                description: "Create custom rooms and invite your friends for a friendly match.",
            },
            {
                title: "Play with AI",
                description: "Test your skills by playing against our intelligent AI.",
            },
            {
                title: "Compete Globally",
                description: "Join random matches with players around the world and rise through the ranks.",
            },
        ],
    },
    vi: {
        title: "Tính Năng Chính",
        features: [
            {
                title: "Tạo Phòng",
                description: "Tạo phòng tùy chỉnh và mời bạn bè tham gia trận đấu thân thiện.",
            },
            {
                title: "Chơi với AI",
                description: "Kiểm tra kỹ năng của bạn bằng cách chơi với AI thông minh của chúng tôi.",
            },
            {
                title: "Cạnh Tranh Toàn Cầu",
                description: "Tham gia các trận đấu ngẫu nhiên với người chơi trên toàn thế giới và leo lên bảng xếp hạng.",
            },
        ],
    },
};

const Features = ({ language = "vi" }) => {
    const data = content[language];

    return (
        <section id="features" className={`${styles.features}`}>
            <h2>{data.title}</h2>
            <div className={`${styles.features__list}`}>
                {data.features.map((feature, index) => (
                    <div key={index} className={`${styles.feature}`}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
