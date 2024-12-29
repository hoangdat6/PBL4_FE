import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
}));

const ErrorNumber = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(6rem, 15vw, 12rem)',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textShadow: `2px 2px 5px ${theme.palette.primary.light}`,
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
        <Container>
            <ErrorNumber variant="h1">404</ErrorNumber>
            <ErrorMessage variant="h2">
                Trang không tồn tại
            </ErrorMessage>
            <Description>
                Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </Description>
            <StyledButton
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = '/')}
            >
                Quay lại trang chủ
            </StyledButton>
        </Container>
    );
}
