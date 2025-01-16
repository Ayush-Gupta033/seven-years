import React, { useState } from "react";
import { Button, Typography, Box, Chip, LinearProgress, Snackbar, Alert } from "@mui/material";
import { pink, purple, red, green } from "@mui/material/colors";
import { keyframes } from "@emotion/react"; // Import keyframes for animations

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const scaleAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;


const questions = [
    { question: "Where was our first date?", options: ["Park", "Restaurant", "Amusement Park"], answer: "Amusement Park" },
    { question: "What color were you wearing when i first saw you?", options: ["Red", "Purple", "Orange"], answer: "Orange" },
    { question: "What’s my favorite color?", options: ["Red", "Blue", "Green"], answer: "Red" },
    { question: "What’s my type?", options: ["Straight Hair with Intelligence", "Bunny Teeth Smile", "Slim Bod"], answer: "Bunny Teeth Smile" },
    { question: "Who is Panda Singh going to marry?", options: ["Tommy Singh", "Potty Kapoor", "Aloo Kachaloo"], answer: "Tommy Singh" },
    { question: "How many kids do we want?", options: ["One", "Seven", "Three"], answer: "One" },
    { question: "What’s our favorite activity to do together?", options: ["Movie Cuddles", "Cooking", "Traveling"], answer: "Movie Cuddles" },
    { question: "What food am i willing to give up on?", options: ["Panner", "Rajma", "Chicken"], answer: "Chicken" },
    { question: "Will I ever stop loving you?", options: ["Yes", "Definitely", "For Sure"], answer: "Never" },
    { question: "Haha! I'll never stop loving you. Don't Worry 😘", options: ["Yes yes ILY2", "I knew it was a joke", "Shut up, Ayu!"], answer: "Shut up, Ayu!" },
];

function Quiz({ onFinish }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackSeverity, setFeedbackSeverity] = useState("success");

    const handleAnswer = (option) => {
        const correct = option === questions[currentQuestion].answer;
        setSelectedOption(option);
        setIsCorrect(correct);

        if (correct) {
            setScore((prev) => prev + 1);
            setFeedbackMessage("🎉 Correct! Our relationship is definitely safe with you!");
            setFeedbackSeverity("success");
        } else {
            setFeedbackMessage("😢 Oops! That’s not it. Very Disappointing!");
            setFeedbackSeverity("error");
        }

        setShowFeedback(true);

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedOption(null);
            setIsCorrect(null);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
            } else {
                onFinish(score + (correct ? 1 : 0)); // Add the last question's score
            }
        }, 1000); // Delay for animation before next question
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", mb: 2, color: pink[500] }} />
            <Typography variant="h6" mb={1} color={purple['A200']}>
                Question {currentQuestion + 1} / {questions.length}
            </Typography>

            <Typography variant="h5" textAlign="center" mb={2} color={purple['A400']}>
                {questions[currentQuestion].question}
            </Typography>

            {questions[currentQuestion].options.map((option, index) => (
                <Button
                    key={index}
                    variant="outlined"
                    color="error"
                    sx={{
                        margin: "8px",
                        width: "100%",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease-in-out",
                        backgroundColor:
                            selectedOption === option
                                ? isCorrect
                                    ? green[300] // Correct answer - Green
                                    : red[300] // Incorrect answer - Red
                                : "transparent",
                        animation:
                            selectedOption === option
                                ? isCorrect
                                    ? `${scaleAnimation} 0.4s ease-in-out` // Scale animation for correct
                                    : `${shakeAnimation} 0.4s ease-in-out` // Shake animation for incorrect
                                : "none",
                    }}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null} // Disable buttons after one selection
                >
                    {option}
                </Button>
            ))}

            <Chip
                label={`Score: ${score}`}
                color="error"
                sx={{ mt: 2, fontSize: "16px", fontWeight: "bold" }}
            />

            <Snackbar open={showFeedback} autoHideDuration={1500}>
                <Alert severity={feedbackSeverity} sx={{ width: "100%" }}>
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Quiz;
