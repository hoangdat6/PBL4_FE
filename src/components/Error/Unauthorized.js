import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {keyframes, styled, ThemeProvider} from '@mui/material/styles';
import darkTheme from '../../theme/darkTheme';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    `;

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    paddingTop: theme.spacing(10),
}));

const ErrorNumber = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(6rem, 15vw, 12rem)',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textShadow: `2px 2px 5px ${theme.palette.primary.light}`,
    animation: `${fadeIn} 1s ease-out`,
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    fontWeight: '400',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
}));

const Description = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    fontSize: '1rem',
}));


export default function NotFoundPage() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <ErrorNumber variant="h1">401</ErrorNumber>
                <ErrorMessage variant="h2">
                    Trang không tồn tại
                </ErrorMessage>
                <Description>
                    Bạn không có quyền truy cập trang này.
                </Description>
                <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => (window.location.href = '/')}
                >
                    Quay lại trang chủ
                </StyledButton>
            </Container>
        </ThemeProvider>
    );
}