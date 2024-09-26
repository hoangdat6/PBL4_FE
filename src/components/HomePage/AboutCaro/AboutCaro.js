import React from 'react';
import styles from './AboutCaro.module.scss';

const AboutCaro = () => {
    return (
        <section className={`${styles.about_caro}`}>
            <div className={`${styles.about_caro__content}`}>
                <h2>About Caro</h2>
                <p>
                    Cờ caro là một trò chơi chiến lược từ xa xưa còn được biết đến là "năm điểm trên một hàng".
                    Trò chơi rất đơn giản ngay cả trong các quy tắc và hình thức nên được chơi bởi cả người lớn và trẻ em.
                </p>
                <h3>Người chơi</h3>
                <p>
                    Bạn là một trong hai người chơi, thi đấu theo hình thức 1 chọi 1 trên bàn cờ 19x19, tổng cộng 361 nút giao, sử dụng các quân cờ đen và trắng.
                </p>
                <h3>Quy tắc</h3>
                <p>
                    Người chơi cờ đen luôn chơi trước và phải đặt nước đầu tiên tại trung tâm bàn cờ. Trò chơi tiếp tục cho đến khi một người chơi có 5 quân cờ cùng màu xếp liên tiếp theo hàng ngang, dọc hoặc chéo.
                </p>
                <h3>Mục đích</h3>
                <p>
                    Mục tiêu của trò chơi là xếp 5 quân cờ cùng màu theo một trong ba hướng: ngang, dọc hoặc chéo.
                </p>
                <h3>Lịch sử</h3>
                <p>
                    Cờ caro đã tồn tại hơn 4000 năm và có nguồn gốc từ Trung Quốc. Trò chơi cũng có bằng chứng xuất hiện ở Hy Lạp cổ đại và Mỹ thời tiền Columbus. Ở Nhật Bản, nó được gọi là "Kakugo" và được biết đến rộng rãi từ thế kỷ 18.
                </p>
            </div>
        </section>
    );
};

export default AboutCaro;
