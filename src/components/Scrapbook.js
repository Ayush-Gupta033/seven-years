import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

function Scrapbook({ onComplete, audioStarted, startAudio }) {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        { image: "/assets/images/img1.jpeg", text: "Happy Birthday to you!" },
        { image: "/assets/images/img1.jpeg", text: "Our first date memory ❤️" },
        // Add more pages here.
    ];

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            {!audioStarted && (
                <Button variant="contained" color="primary" onClick={startAudio}>
                    Start the Scrapbook
                </Button>
            )}
            {audioStarted && (
                <>
                    <Box
                        component="img"
                        src={pages[currentPage].image}
                        alt="Scrapbook Page"
                        sx={{ width: "35rem", borderRadius: "8px", marginBottom: 2 }}
                    />
                    <Typography variant="h6" align="center">{pages[currentPage].text}</Typography>
                    <Box mt={2}>
                        <Button onClick={prevPage} disabled={currentPage === 0} variant="contained" sx={{ mr: 1 }}>
                            Previous
                        </Button>
                        {currentPage < pages.length - 1 ? (
                            <Button onClick={nextPage} variant="contained">
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
        </Box>
    );
}

export default Scrapbook;
