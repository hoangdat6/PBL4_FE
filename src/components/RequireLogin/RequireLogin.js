import {Button} from "@mui/material";
import SignInSignUp from "../../pages/AuthPage/SignInSignUp";
import React, {useEffect} from "react";

const RequireLogin = ({toggleOverlay, Overlay,  handleLoginSuccess}) => {

    useEffect(() => {
        toggleOverlay();
    }, []);

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <h1 style={{color: "white"}}>Vui lòng đăng nhập để có thể truy cập trang này!</h1>
            <Button variant="contained" onClick={toggleOverlay}>Đăng nhập</Button>
            <SignInSignUp toggleOverlay={toggleOverlay} Overlay={Overlay} handleLoginSuccess={handleLoginSuccess}/>
        </div>
    )
}

export default RequireLogin;

