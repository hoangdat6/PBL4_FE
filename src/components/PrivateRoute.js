import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import useOverlay from "../hooks/useOverlay/useOverlay";
import {useLocation, useNavigate} from "react-router-dom";
import RequireLogin from "./RequireLogin/RequireLogin";
import SignInSignUp from "../pages/AuthPage/SignInSignUp";

const PrivateRoute = ({ children, isWithText }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { toggleOverlay, Overlay } = useOverlay();
    const navigate = useNavigate();
    const location = useLocation();
    const [previousLocation, setPreviousLocation] = useState("/");

    useEffect(() => {
        if (!isAuthenticated) {
            setPreviousLocation(location.pathname);
            toggleOverlay();
        }
    }, [isAuthenticated, location.pathname]);

    const handleLoginSuccess = () => {
        toggleOverlay();
        const redirectTo = previousLocation || '/';
        navigate(redirectTo)
    };

    if (!isAuthenticated) {
        return (
            isWithText ? (
                <RequireLogin
                    toggleOverlay={toggleOverlay}
                    Overlay={Overlay}
                    handleLoginSuccess={handleLoginSuccess}
                />
            ) : (
                <SignInSignUp handleLoginSuccess={handleLoginSuccess}
                              Overlay={Overlay}
                              toggleOverlay={toggleOverlay}
                />
            )
        );
    }

    return children;
};

export default PrivateRoute;
