import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Styled components
const AnimatedBox = styled(Box)(({ theme }) => ({
    animation: "fadeIn 2s",
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0,
            transform: "translateY(20px)",
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
}));

const HeartButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: "#d32f2f", // Red fallback
    backgroundColor: "#fff", // White fallback
    border: "2px solid #d32f2f", // Red fallback
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#ffcccb", // Light Red fallback
        color: "#fff",
    },
}));

function Letter({ onDone }) {
    return (
        <AnimatedBox display="flex" flexDirection="column" alignItems="center" p={4} textAlign="center">
            {/* Title */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                To the Love of My Life
            </Typography>

            {/* Letter Content */}
            <Typography variant="body1" mb={2} sx={{ fontSize: "18px", lineHeight: "1.6" }}>
                Happy Birthday! You’ve brought so much joy and love into my life. I’m grateful for every moment we’ve shared and
                excited for all the memories we’ll create together. You’re my sunshine and my heart. ❤️
            </Typography>

            {/* Signature */}
            <Typography variant="h6" sx={{ fontStyle: "italic", color: "#f50057" }}>
                Love, Ayushp
            </Typography>

            {/* Heart Button */}
            <HeartButton
                variant="contained"
                endIcon={<FavoriteIcon />}
                onClick={onDone}
            >
                Back to Main Menu
            </HeartButton>
        </AnimatedBox>
    );
}

export default Letter;
