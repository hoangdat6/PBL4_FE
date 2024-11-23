import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import SignInSignUp from "../pages/AuthPage/SignInSignUp";
import useOverlay from "../hooks/useOverlay/useOverlay";
import { Button } from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import RequireLogin from "./RequireLogin/RequireLogin";

const PrivateRoute = ({ children }) => {
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
            <RequireLogin
                toggleOverlay={toggleOverlay}
                Overlay={Overlay}
                handleLoginSuccess={handleLoginSuccess}
            />
        );
    }

    return children;
};

export default PrivateRoute;
