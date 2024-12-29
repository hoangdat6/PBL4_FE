import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../Common.module.scss';

import GoogleIcon from '../../../assets/statics/imgs/SignIn/icons8-google.svg';
import FacebookIcon from '../../../assets/statics/imgs/SignIn/icons8-facebook.svg';
import AppleIcon from '../../../assets/statics/imgs/SignIn/icons8-apple.svg';


const SignIn = ({ toggleOverlay, onSignUp, handleSignIn }) => {

    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            handleSignIn(values.email, values.password)
            toggleOverlay();
        },
    });

    const handleSignUpPopUp = (e) => {
        e.preventDefault();
        onSignUp();
    };

    return (
        <form onSubmit={formik.handleSubmit} className={`${styles.c}`}>

            <div className={`${styles.c__container}`}>
                <div className={`${styles.c__header}`}>
                    <h2 className={`${styles.c__title}`}>Bạn đã trở lại?</h2>
                </div>
                <div className={`${styles.c__form}`}>
                    <div className={`${styles.c__form_group}`}>
                        <input
                            type="email"
                            name="email"
                            className={`${styles.c__input}`}
                            placeholder="Email của bạn"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={`${styles.c__error}`}>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className={`${styles.c__form_group}`}>
                        <input
                            type="password"
                            name="password"
                            className={`${styles.c__input}`}
                            placeholder="Mật khẩu"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={`${styles.c__error}`}>{formik.errors.password}</div>
                        ) : null}
                        <a href="#!" className={`${styles.c__forgot_link}`}>
                            <p className={`${styles.c__forgot_text}`}>Bạn quên mật khẩu ư!</p>
                        </a>
                    </div>
                    <div className={`${styles.c__form_group}`}>
                        <button type="submit" className={`${styles.c__submit_button}`}>Đăng nhập</button>
                    </div>
                    <div className={`${styles.c__signup}`}>
                        <p className={`${styles.c__signup_text}`}>
                            Bạn chưa có tài khoản?
                            <a href="#!"
                               className={`${styles.c__signup_link}`}
                               onClick={handleSignUpPopUp}
                            >
                                <span className={`${styles.c__signup_span}`}>Đăng ký</span>
                            </a>
                        </p>
                    </div>
                </div>
                <div className={`${styles.c__social}`}>
                    <div className={`${styles.c__divider} d-flex justify-content-center align-items-center`}>
                        <hr className={`${styles.c__divider_line} flex-grow-1`} />
                        <div className={`${styles.c__divider_text} text-center ms-5 me-5`}>Hoặc</div>
                        <hr className={`${styles.c__divider_line} flex-grow-1`} />
                    </div>

                    <div className={`${styles.c__social_button} mt-3`}>
                        <button className={`${styles.c__social_button_google} btn`}>
                            <img src={GoogleIcon} alt="" />
                            <span>Đăng nhập bằng Google</span>
                        </button>
                    </div>
                    <div className={`${styles.c__social_button} mt-3`}>
                        <button className={`${styles.c__social_button_facebook} btn`}>
                            <img src={FacebookIcon} alt="" />
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                    </div>

                    <div className={`${styles.c__social_button} mt-3`}>
                        <button className={`${styles.c__social_button_apple} btn`}>
                            <img src={AppleIcon} alt="" />
                            <span>Đăng nhập bằng Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignIn;