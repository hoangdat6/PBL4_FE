import React from "react";
import styles from "./RulesContent.module.scss";

const RulesContent = () => {
    return (
        <div className={styles.rulesContent}>
            {/* Phần Luật Chơi */}
            <section className={styles.section}>
                <h2>Luật Chơi</h2>
                <ul>
                    <li>1. Hãy lịch sự và tôn trọng đối thủ.</li>
                    <li>2. Chơi công bằng và không gian lận.</li>
                    <li>3. Tận hưởng trò chơi và có những giây phút vui vẻ.</li>
                </ul>
            </section>

            {/* Phần Cách Tính Điểm */}
            <section className={styles.section}>
                <h2>Cách Tính Điểm Xếp Hạng</h2>
                <p><strong>Tăng/giảm điểm dựa trên cấp bậc:</strong></p>
                <ul>
                    <li><strong>Tân binh:</strong> 0 - 100 điểm</li>
                    <li><strong>Chuyên nghiệp:</strong> 101 - 300 điểm</li>
                    <li><strong>Cao thủ:</strong> Trên 300 điểm</li>
                    <li><strong>Thách đấu:</strong> Top 20 điểm cao nhất (số điểm phải lớn hơn 300)</li>
                </ul>
                <p><strong>Điểm sau mỗi trận đấu:</strong></p>
                <ul>
                    <li><strong>Thắng:</strong> +10 điểm</li>
                    <li><strong>Hòa:</strong> +5 điểm</li>
                    <li><strong>Thua:</strong> -10 điểm</li>
                </ul>

                <p><strong>Hệ thống điểm thưởng:</strong></p>
                <ul>
                    <li><strong>Thắng liên tục:</strong></li>
                    <ul>
                        <li>Chuỗi win 2: +1 điểm thưởng</li>
                        <li>Chuỗi win 3: +2 điểm thưởng</li>
                        <li>Chuỗi win 4: +3 điểm thưởng</li>
                        <li>Chuỗi win 5: +4 điểm thưởng</li>
                        <li>Chuỗi win > 5: +5 điểm thưởng</li>
                    </ul>
                    <li><strong>Thời gian chơi nhanh:</strong></li>
                    <ul>
                        <li>Nhanh hơn 1 phút: +1 điểm thưởng</li>
                        <li>Nhanh hơn 2 phút: +2 điểm thưởng</li>
                        <li>Nhanh hơn 3 phút: +3 điểm thưởng</li>
                        <li>Nhanh hơn 4 phút: +4 điểm thưởng</li>
                        <li>Nhanh hơn 5 phút: +5 điểm thưởng</li>
                    </ul>
                </ul>

                <p><strong>Xếp hạng mùa giải:</strong></p>
                <ul>
                    <li><strong>Tân binh:</strong> Khung tân binh, 100 vàng</li>
                    <li><strong>Chuyên nghiệp:</strong> Khung chuyên nghiệp, 200 vàng</li>
                    <li><strong>Cao thủ:</strong> Khung cao thủ, 300 vàng</li>
                    <li>
                        <strong>Thách đấu:</strong> Khung thách đấu (kèm theo top),
                        400 vàng + (20 - top) * 5 vàng
                    </li>
                </ul>
                <p>
                    Vàng được dùng để mua emotion và những thứ khác (sẽ cập nhật thêm sau) ở trong cửa hàng.
                </p>
            </section>
        </div>
    );
};

export default RulesContent;
