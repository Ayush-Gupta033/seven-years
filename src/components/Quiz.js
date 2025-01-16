import React, { useState } from "react";
import { Button, Typography, Box, Chip, LinearProgress, Snackbar, Alert } from "@mui/material";

const questions = [
    { question: "Where was our first date?", options: ["Park", "Restaurant", "Beach"], answer: "Restaurant" },
    { question: "What’s my favorite movie?", options: ["Inception", "Titanic", "Interstellar"], answer: "Inception" },
    // { question: "What’s my favorite color?", options: ["Red", "Blue", "Green"], answer: "Blue" },
    // { question: "What’s my dream destination?", options: ["Paris", "Maldives", "Tokyo"], answer: "Maldives" },
    // { question: "Which food do I love?", options: ["Pizza", "Sushi", "Burger"], answer: "Pizza" },
    // { question: "What’s my pet’s name?", options: ["Buddy", "Max", "Charlie"], answer: "Buddy" },
    // { question: "What’s my favorite hobby?", options: ["Reading", "Cooking", "Traveling"], answer: "Reading" },
    // { question: "What’s my zodiac sign?", options: ["Gemini", "Leo", "Taurus"], answer: "Gemini" },
];

function Quiz({ onFinish }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackSeverity, setFeedbackSeverity] = useState("success");

    const handleAnswer = (option) => {
        const isCorrect = option === questions[currentQuestion].answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setFeedbackMessage("🎉 Correct! You know me so well!");
            setFeedbackSeverity("success");
        } else {
            setFeedbackMessage("😢 Oops! That’s not it.");
            setFeedbackSeverity("error");
        }

        setShowFeedback(true);

        setTimeout(() => {
            setShowFeedback(false);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
            } else {
                onFinish(score + (isCorrect ? 1 : 0)); // Add the last question's score
            }
        }, 1500); // Delay before moving to the next question
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            {/* Progress Bar */}
            <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", mb: 2 }} />
            <Typography variant="h6" mb={1}>
                Question {currentQuestion + 1} / {questions.length}
            </Typography>

            {/* Question */}
            <Typography variant="h5" textAlign="center" mb={2}>
                {questions[currentQuestion].question}
            </Typography>

            {/* Options */}
            {questions[currentQuestion].options.map((option, index) => (
                <Button
                    key={index}
                    variant="outlined"
                    sx={{
                        margin: "8px",
                        width: "100%",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontSize: "16px",
                    }}
                    onClick={() => handleAnswer(option)}
                >
                    {option}
                </Button>
            ))}

            {/* Score */}
            <Chip
                label={`Score: ${score}`}
                color="primary"
                sx={{ mt: 2, fontSize: "16px", fontWeight: "bold" }}
            />

            {/* Feedback Snackbar */}
            <Snackbar open={showFeedback} autoHideDuration={1500}>
                <Alert severity={feedbackSeverity} sx={{ width: "100%" }}>
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Quiz;
