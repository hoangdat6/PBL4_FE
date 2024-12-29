import { Button, Box } from "@mui/material";
import SignInSignUp from "../../pages/AuthPage/SignInSignUp";
import React, { useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const RequireLogin = ({ toggleOverlay, Overlay, handleLoginSuccess }) => {
    const navigate = useNavigate();

    useEffect(() => {
        toggleOverlay();
    }, []);

    return (
        <Box
            sx={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "#1a1a2e",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
            }}
        >
            <LockIcon sx={{ fontSize: "80px", color: "#4caf50", marginBottom: "20px" }} />
            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                Truy cập bị hạn chế!
            </h1>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                Bạn cần đăng nhập để truy cập trang này. Vui lòng đăng nhập để tiếp tục.
            </p>
            <Box sx={{ display: "flex", gap: "20px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleOverlay}
                    sx={{
                        fontSize: "1rem",
                        padding: "10px 20px",
                        textTransform: "none",
                    }}
                >
                    Đăng nhập
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/")}
                    sx={{
                        fontSize: "1rem",
                        padding: "10px 20px",
                        textTransform: "none",
                        borderColor: "#fff",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#4caf50",
                            color: "#000",
                        },
                    }}
                >
                    Trang chủ
                </Button>
            </Box>
            <SignInSignUp
                toggleOverlay={toggleOverlay}
                Overlay={Overlay}
                handleLoginSuccess={handleLoginSuccess}
            />
        </Box>
    );
};

export default RequireLogin;
