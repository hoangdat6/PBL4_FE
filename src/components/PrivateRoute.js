import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInSignUp from "../pages/AuthPage/SignInSignUp";
import useOverlay from "../hooks/useOverlay/useOverlay";
import { Button } from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { toggleOverlay, Overlay } = useOverlay();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem("redirectAfterLogin", location.pathname);
            toggleOverlay();
        }
    }, [isAuthenticated, location.pathname]);

    const handleLoginSuccess = () => {
        toggleOverlay();
        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectTo)
    };

    if (!isAuthenticated) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Vui lòng đăng nhập để có thể truy cập trang này!</h1>
                <Button variant="contained" onClick={toggleOverlay}>Đăng nhập</Button>
                <SignInSignUp toggleOverlay={toggleOverlay} Overlay={Overlay} handleLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }

    return children;
};

export default PrivateRoute;
