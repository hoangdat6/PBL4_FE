import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './RoomCodePopup.module.scss';

const RoomCodePopup = ({ onSubmit }) => {
    const validationSchema = Yup.object({
        code: Yup.string()
            .trim()
            .required('Mã code không được để trống')
    });

    const formik = useFormik({
        initialValues: { code: '' },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values.code); // Gọi hàm onSubmit với mã code đã cắt
        },
    });

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length <= 6) { // Kiểm tra xem chỉ có số và không quá 6 chữ số
            formik.setFieldValue('code', value); // Cập nhật giá trị code
        }
    };

    return (
        <div className={styles.roomCodePopup}>
            <div className={styles.roomCodePopup__content}>
                <h2 className={styles.roomCodePopup__title}>Enter Room Code</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        className={styles.roomCodePopup__input}
                        placeholder="Enter code"
                        value={formik.values.code} // Liên kết với giá trị của Formik
                        onChange={handleChange} // Gọi hàm handleChange để xử lý sự kiện nhập
                    />
                    {formik.touched.code && formik.errors.code ? (
                        <p className={styles.error}>{formik.errors.code}</p> // Hiển thị thông báo lỗi
                    ) : null}
                    <button type="submit" className={styles.roomCodePopup__button}>
                        Join Room
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RoomCodePopup;
