import React from 'react';
import styles from './AboutCaro.module.scss';

const aboutCaroContent = {
    vi: {
        title: "Về caro",
        intro: "Cờ caro là một trò chơi chiến lược từ xa xưa còn được biết đến là 'năm điểm trên một hàng'. Trò chơi rất đơn giản ngay cả trong các quy tắc và hình thức nên được chơi bởi cả người lớn và trẻ em.",
        sections: [
            {
                title: "Người chơi",
                content: "Bạn là một trong hai người chơi, thi đấu theo hình thức 1 chọi 1 trên bàn cờ 19x19, tổng cộng 361 nút giao, sử dụng các quân cờ đen và trắng.",
            },
            {
                title: "Quy tắc",
                content: "Người chơi cờ đen luôn chơi trước và phải đặt nước đầu tiên tại trung tâm bàn cờ. Trò chơi tiếp tục cho đến khi một người chơi có 5 quân cờ cùng màu xếp liên tiếp theo hàng ngang, dọc hoặc chéo.",
            },
            {
                title: "Mục đích",
                content: "Mục tiêu của trò chơi là xếp 5 quân cờ cùng màu theo một trong ba hướng: ngang, dọc hoặc chéo.",
            },
            {
                title: "Lịch sử",
                content: "Cờ caro đã tồn tại hơn 4000 năm và có nguồn gốc từ Trung Quốc. Trò chơi cũng có bằng chứng xuất hiện ở Hy Lạp cổ đại và Mỹ thời tiền Columbus. Ở Nhật Bản, nó được gọi là 'Kakugo' và được biết đến rộng rãi từ thế kỷ 18.",
            },
        ],
    },
    en: {
        title: "About Caro",
        intro: "Caro is a classic strategy game, also known as 'five in a row'. The game is simple in both rules and format, making it suitable for both adults and children.",
        sections: [
            {
                title: "Players",
                content: "You are one of two players, competing in a 1v1 match on a 19x19 grid with a total of 361 intersections, using black and white stones.",
            },
            {
                title: "Rules",
                content: "The black player always goes first and must place the first move at the center of the board. The game continues until a player forms a line of 5 stones of the same color either horizontally, vertically, or diagonally.",
            },
            {
                title: "Objective",
                content: "The goal of the game is to align 5 stones of the same color in one of three directions: horizontal, vertical, or diagonal.",
            },
            {
                title: "History",
                content: "Caro has existed for over 4000 years and originated in China. Evidence also points to its presence in ancient Greece and pre-Columbian America. In Japan, it is known as 'Kakugo' and became widely popular in the 18th century.",
            },
        ],
    },
};


const AboutCaro = ({ language = "vi" }) => {
    const data = aboutCaroContent[language];

    return (
        <section className={`${styles.about_caro}`}>
            <div className={`${styles.about_caro__content}`}>
                <h2>{data.title}</h2>
                <p>{data.intro}</p>
                {data.sections.map((section, index) => (
                    <div key={index}>
                        <h3>{section.title}</h3>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutCaro;