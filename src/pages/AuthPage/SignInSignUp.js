import SignIn from "../../components/SignInSignUp/SignIn/SignIn";
import SignUp from "../../components/SignInSignUp/SignUp/SignUp";
import {useCallback, useState} from "react";
import AuthService from "../../services/auth.service";
import Cookies from "js-cookie";
import {setUserId} from "../../store/slices/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSnackbar} from "../../hooks/useSnackbar";
import {Snackbar} from "@mui/material";
import {getRandomAvatar} from "../../utils/AvatarUtils";

const SignInSignUp = ({ Overlay, toggleOverlay, handleLoginSuccess }) => {
    const [isSignInMode, setIsSignInMode] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const { open, message, autoHideDuration, openSnackbar, closeSnackbar } = useSnackbar();

    const toggleMode = () => {
        setIsSignInMode((prevMode) => !prevMode);
    };

    const toggleOverlayCustom = () => {
        //
        setIsSignInMode(true);
    };


    const handleSignIn = (email, password) => {
        AuthService.login(email, password).then(
            (response) => {
                Cookies.set('userId', JSON.stringify(response.data.id), { expires: 7 });
                dispatch(setUserId(response.data.id));

                // nếu là admin thì chuyển hướng đến trang admin
                if (response.data.role === 'ROLE_ADMIN') {
                    navigate('/admin');
                    return;
                }

                navigate(location.pathname || '/');
                toggleOverlay();
                openSnackbar('Đăng nhập thành công', 3000);
                toggleOverlay();
            },
            (error) => {
                openSnackbar('Email hoặc mật khẩu bị sai', 3000);
            }
        );
    }

    const handelSignUp = (displayName, email, password) => {
        AuthService.register(displayName, email, password, getRandomAvatar()).then(
            (response) => {
                openSnackbar('Đăng ký thành công', 3000);
                toggleMode();
            },
            (error) => {
                openSnackbar('Đăng ký thất bại', 3000);
            }
        );
    }

    const renderForm = () => {
        return isSignInMode ? (
            <SignIn toggleOverlay={toggleOverlayCustom} onSignUp={toggleMode} handleSignIn={handleSignIn} />
        ) : (
            <SignUp toggleOverlay={toggleOverlayCustom} onSignUp={toggleMode} handleSignUp={handelSignUp}/>
        );
    };

    return (
        <div>
            <Overlay
                overlayClickHidden={false}
            >
                <Snackbar
                    open={open}
                    autoHideDuration={autoHideDuration}
                    onClose={closeSnackbar}
                    message={message}
                />
                {renderForm()}
            </Overlay>
        </div>
    );
}

export default SignInSignUp;
