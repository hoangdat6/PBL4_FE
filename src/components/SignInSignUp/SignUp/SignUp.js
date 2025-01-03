import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../Common.module.scss"; // Đảm bảo bạn có file SCSS tương ứng
import GoogleIcon from '../../../assets/statics/imgs/SignIn/icons8-google.svg';
import FacebookIcon from '../../../assets/statics/imgs/SignIn/icons8-facebook.svg';
import AppleIcon from '../../../assets/statics/imgs/SignIn/icons8-apple.svg';
import AuthService from "../../../services/auth.service";


const SignUp = ({toggleOverlay, onSignUp, handleSignUp}) => {
    const formik = useFormik({
        initialValues: {
            display_name: "",
            email: "",
            password: "",
            confirm_password: "",
            terms: false,
        },
        validationSchema: Yup.object({
            display_name: Yup.string()
                .required("Tên hiển thị là bắt buộc"),
            email: Yup.string()
                .email("Địa chỉ email không hợp lệ")
                .required("Email là bắt buộc"),
            password: Yup.string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .required("Mật khẩu là bắt buộc"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], "Mật khẩu xác nhận không khớp")
                .required("Xác nhận mật khẩu là bắt buộc"),
            terms: Yup.bool()
                .oneOf([true], "Bạn phải đồng ý với các điều khoản và điều kiện"),
        }),
        onSubmit: (values) => {
            handleSignUp(values.display_name, values.email, values.password);
        },
    });

    const handleSignInPopUp = (e) => {
        e.preventDefault();
        onSignUp();
    }

    return (
        <div className={styles.c}>
            <div className={styles.c__container}>
                <div className={styles.c__header}>
                    <h2 className={styles.c__title}>Đăng ký</h2>
                </div>
                <form className={styles.c__form} onSubmit={formik.handleSubmit}>
                    <div className={styles.c__form_group}>
                        <input
                            type="text"
                            className={styles.c__input}
                            name="display_name"
                            placeholder="Tên hiển thị"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.display_name}
                        />
                        {formik.touched.display_name && formik.errors.display_name ? (
                            <div className={styles.c__error}>{formik.errors.display_name}</div>
                        ) : null}
                    </div>
                    <div className={styles.c__form_group}>
                        <input
                            type="email"
                            className={styles.c__input}
                            name="email"
                            placeholder="Email của bạn"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={styles.c__error}>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className={styles.c__form_group}>
                        <input
                            type="password"
                            className={styles.c__input}
                            name="password"
                            placeholder="Mật khẩu"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={styles.c__error}>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className={styles.c__form_group}>
                        <input
                            type="password"
                            className={styles.c__input}
                            name="confirm_password"
                            placeholder="Xác nhận mật khẩu"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirm_password}
                        />
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                            <div className={styles.c__error}>{formik.errors.confirm_password}</div>
                        ) : null}
                    </div>
                    <div className={styles.c__form_group}>
                        <label>
                            <input
                                type="checkbox"
                                name="terms"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.terms}
                            />
                            Tôi đồng ý với các
                            <a href="/terms" className={styles.c__terms_link}> điều khoản và điều kiện</a>
                        </label>
                        {formik.touched.terms && formik.errors.terms ? (
                            <div className={styles.c__error}>{formik.errors.terms}</div>
                        ) : null}
                    </div>
                    <div className={styles.c__form_group}>
                        <button type="submit" className={styles.c__submit_button}>Đăng ký</button>
                    </div>
                    <div className={styles.c__signup}>
                        <p className={styles.c__signup_text}>
                            Bạn đã có tài khoản?
                            <a
                                href="/c"
                                className={styles.c__signup_link}
                                onClick={handleSignInPopUp}
                            >
                                <span className={styles.c__signup_span}>Đăng nhập</span>
                            </a>
                        </p>
                    </div>
                </form>
                <div className={styles.c__social}>
                    <div className={`${styles.c__divider} d-flex justify-content-center align-items-center`}>
                        <hr className={`${styles.c__divider_line} flex-grow-1`}/>
                        <div className={`${styles.c__divider_text} text-center ms-5 me-5`}>Hoặc</div>
                        <hr className={`${styles.c__divider_line} flex-grow-1`}/>
                    </div>

                    <div className={`${styles.c__social_button} mt-3`}>
                        <button className={`${styles.c__social_button_google} btn`}>
                            <img src={GoogleIcon} alt=""/>
                            <span>Đăng nhập bằng Google</span>
                        </button>
                    </div>
                    <div className={`${styles.c__social_button} mt-3`}>
                        <button className={`${styles.c__social_button_facebook} btn`}>
                            <img src={FacebookIcon} alt=""/>
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                    </div>

                    <div className={`${styles.c__social_button} mt-3`}>
                        <button className={`${styles.c__social_button_apple} btn`}>
                            <img src={AppleIcon} alt=""/>
                            <span>Đăng nhập bằng Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
