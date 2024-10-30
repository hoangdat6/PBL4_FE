import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInSignUp from "./LoginSignUp/SignInSignUp";
import useOverlay from "../hooks/useOverlay/useOverlay";
import {Button} from "@mui/material";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { toggleOverlay, Overlay } = useOverlay();

    useEffect(() => {
        if (!isAuthenticated) {
            toggleOverlay();
        }
    }, [isAuthenticated]);

    return (isAuthenticated ?
            children :
            (
                <div>
                    <SignInSignUp Overlay={Overlay} toggleOverlay={toggleOverlay}/>
                    <h1>Vui lòng đăng nhập để có thể tạo phòng chơi!</h1>
                    <Button onClick={toggleOverlay}>Đăng nhập</Button>
                </div>
            )
    );
};

export default PrivateRoute;