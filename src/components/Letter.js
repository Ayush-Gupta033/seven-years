import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
document.head.appendChild(link);

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
    color: "#d32f2f",
    backgroundColor: "#fff",
    border: "2px solid #d32f2f",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#ffcccb",
        color: "#fff",
    },
}));

function Letter({ onDone }) {
    return (
        <AnimatedBox display="flex" flexDirection="column" justifyContent={"center"} alignItems="center" p={4} mt={2} textAlign="center" style={{ backgroundImage: "url('/assets/images/letter.jpg')", backgroundSize: "contain", minHeight: "85vh", width: "60vw" }}>
            {/* Title */}
            <Typography variant="h4" gutterBottom sx={{
                fontWeight: "bold", fontFamily: "'Great Vibes', cursive", // Applying the romantic font
                fontSize: "3rem",
                letterSpacing: "0.1rem",
                color: pink[500], // Make sure text color is readable on dark backgrounds
                marginBottom: 3,
                animation: "fadeIn 1s forwards",
            }}>
                To the Love of My Life,
                <br />
                Panda Singh 🐼❤️
            </Typography>

            {/* Letter Content */}
            <Typography variant="body1" mb={2} sx={{
                fontSize: "1.7rem", lineHeight: "1.4", fontFamily: "'Great Vibes', serif",
                fontWeight: "600", // Applying the romantic font
                letterSpacing: "0.1rem",
                animation: "fadeIn 1s forwards",
            }}>
                Happy Anniversary! Wow, it's been 7 incredible years, and here we are, still together—who would've thought I’d last this long with someone who used to have bunny teeth?

                Just kidding! I love you more than words can express, and I’m so thankful to have you by my side.

                I wanted to take a moment to write you this letter to share my deep love and appreciation for you—and yes, maybe show off my coding skills too (after all, you deserve nothing but the best!).

                It’s been an amazing journey with you, and we’ve faced so much together. From watching you outside my classroom window to waking up beside you, every moment with you is pure magic.

                I’m incredibly proud of all we’ve accomplished and the beautiful life we’re continuing to build together.

                You’ve filled my life with so much happiness and love. I’m grateful for every moment we’ve shared and look forward to all the memories yet to come.

                <br/>
                I hope you liked this little surprise of mine and also check you're email na babe 😘.
                <br/>

                You’re my sunshine and my heart. ❤️
            </Typography>

            {/* Signature */}
            <Typography variant="h6" sx={{
                fontStyle: "italic", color: pink[500],
                fontFamily: "'Great Vibes', serif",
                fontWeight: "600", // Applying the romantic font
                letterSpacing: "0.1rem",
                animation: "fadeIn 1s forwards",
            }}>
                Love, <br />
                Yours Tommy Singh 🐾❤️
            </Typography>

            {/* Heart Button */}
            <HeartButton
                variant="contained"
                endIcon={<FavoriteIcon />}
                onClick={onDone}
            >
                Want to replay the journey?
            </HeartButton>
            <style>
                {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
            </style>
        </AnimatedBox>
    );
}

export default Letter;
