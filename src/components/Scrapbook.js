import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap';
document.head.appendChild(link);

function Scrapbook({ onComplete, audioStarted, startAudio }) {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        { image: "/assets/images/img0.jpeg", text: "Happy Anniversary to us! Who knew forever could be this fun? 💕" },
        { image: "/assets/images/img1.jpeg", text: "This is a tribute to us, We're meant to be forever" },
        { image: "/assets/images/img2.jpeg", text: "We started as a couple, but we’ve grown into the best part of each other." },
        { image: "/assets/images/img3.jpeg", text: "No matter where life takes us, my heart will always belong to you. 💖" },
        { image: "/assets/images/img4.jpeg", text: "You, me, and forever. Here’s to all our memories and the many more to come!" },
        { image: "/assets/images/img5.jpeg", text: "No matter the countless moments, every single one with you is special. 💫" },
        { image: "/assets/images/img6.jpeg", text: "Our one of the first's that i'll cherish forever." },
        { image: "/assets/images/img7.jpeg", text: "With you, every day feels like a love story. Here’s to us! ❤️" },

    ];

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2} position="relative">
            {!audioStarted && (
                <Button variant="contained" color="error" onClick={startAudio}>
                    Hey There Babe! <br /> Hit Me And Let's Start Our Journey! 🎶
                </Button>
            )}

            {audioStarted && (
                <>
                    <Box
                        key={currentPage}
                        component="img"
                        src={pages[currentPage].image}
                        alt="Scrapbook Page"
                        sx={{
                            height: "45rem",
                            width: "33rem",
                            borderRadius: "8px",
                            marginBottom: 2,
                            opacity: 0,
                            animation: "fadeIn 1s forwards",  // Animation for fade-in
                            transition: "opacity 1s ease-in-out", // Smooth transition
                        }}
                    />
                    <Typography variant="h6" align="center" sx={{
                        animation: "fadeIn 1s forwards", transition: "opacity 1s ease-in-out", color: pink[500], fontFamily: "'Dancing Script', cursive", // Applying the romantic font
                        fontSize: "2rem",
                        letterSpacing: "0.1rem",
                    }}>
                        {pages[currentPage].text}
                    </Typography>
                    <Box mt={2}>
                        <Button onClick={prevPage} disabled={currentPage === 0} variant="contained" color="error" sx={{ mr: 1 }}>
                            Previous
                        </Button>
                        {currentPage < pages.length - 1 ? (
                            <Button onClick={nextPage} variant="contained" color="error">
                                Next
                            </Button>
                        ) : (
                            <Button onClick={onComplete} variant="contained" color="success">
                                Start Quiz
                            </Button>
                        )}
                    </Box>
                </>
            )}

            {/* CSS for fadeIn animation */}
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
        </Box>
    );
}

export default Scrapbook;
