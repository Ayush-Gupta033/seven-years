import React, { useState, useEffect } from "react";
import Scrapbook from "./components/Scrapbook";
import Quiz from "./components/Quiz";
import Letter from "./components/Letter";
import { Box, IconButton, Tooltip } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { pink } from "@mui/material/colors";
import { styled } from "@mui/system";

// Styled component for the heart animation
const FloatingHearts = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  pointerEvents: "none", // To allow clicks on other elements
  "& .heart": {
    position: "absolute",
    fontSize: "2rem",
    animation: "float 6s ease-in-out infinite",
    "&:nth-child(odd)": {
      animationDuration: "8s", // Different speed for variation
    },
    "&:nth-child(even)": {
      animationDuration: "10s", // Different speed for variation
    },
  },
  "@keyframes float": {
    "0%": {
      transform: "translateY(0) scale(1)",
      opacity: 1,
    },
    "50%": {
      transform: "translateY(-150px) scale(1.2)",
      opacity: 0.8,
    },
    "100%": {
      transform: "translateY(0) scale(1)",
      opacity: 1,
    },
  },
}));

const imagePaths = [
  "/assets/images/bgImg.jpg",
  "/assets/assets/images/img0.jpeg",
  "/assets/assets/images/img1.jpeg",
  "/assets/assets/images/img2.jpeg",
  "/assets/assets/images/img3.jpeg",
  "/assets/assets/images/img4.jpeg",
  "/assets/images/letter.jpg",
];

function preloadImages(images) {
  images.forEach((image) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = image;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

function App() {
  const [step, setStep] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [quizScore, setQuizScore] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Preload all the images once the component mounts
    preloadImages(imagePaths);
  }, []);

  // List of songs to play
  const songs = [
    "/assets/audio/Still-Thinking-Of-You.mp3",
    "/assets/audio/A-Thousand-Years.mp3",
    "/assets/audio/Humsafar.mp3",
    "/assets/audio/Perfect.mp3",
  ];

  // // Start playing the audio
  // const startAudio = () => {
  //   const newAudio = new Audio(songs[currentSongIndex]);

  //   newAudio.addEventListener("ended", () => {
  //     nextSong(); // Automatically play the next song when one ends
  //   });
  //   // newAudio.loop = true;
  //   newAudio.play();
  //   setAudio(newAudio);
  //   setAudioStarted(true);
  // };

  // Pause the audio
  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setAudioPaused(true);
    }
  };

  // Play the audio again
  const playAudio = () => {
    if (audio) {
      audio.play();
      setAudioPaused(false);
    }
  };

  // // Skip to the next song
  // const nextSong = () => {
  //   if (audio) {
  //     audio.pause();
  //   }
  //   const nextIndex = (currentSongIndex + 1) % songs.length;
  //   setCurrentSongIndex(nextIndex);
  //   const newAudio = new Audio(songs[nextIndex]);
  //   newAudio.addEventListener("ended", () => {
  //     nextSong(); // Continue playing the next song automatically
  //   });
  //   // newAudio.loop = true;
  //   newAudio.play();
  //   setAudio(newAudio);
  // };

  useEffect(() => {
    if (!audioStarted) return;

    if (audio) {
      audio.pause(); // Stop the previous audio
    }

    const newAudio = new Audio(songs[currentSongIndex]);
    newAudio.addEventListener("ended", () => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    });
    console.log('play', currentSongIndex);
    newAudio.play();
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.removeEventListener("ended", () => { });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex]); // Trigger effect when song index changes

  // Start playing the first audio
  const startAudio = () => {
    if (!audioStarted) {
      setCurrentSongIndex(0); // Ensure it starts from the first song
      setAudioStarted(true);
    }
  };

  // Skip to the next song manually
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };


  // Function to generate random positions for hearts
  const generateRandomHearts = () => {
    const heartsArray = [];
    const heartCount = 10; // Number of floating hearts

    for (let i = 0; i < heartCount; i++) {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const fontSize = `${Math.random() * 1.5 + 1.5}rem`; // Random size for hearts
      const animationDelay = `${Math.random() * 2}s`; // Random delay for variety

      heartsArray.push(
        <div
          key={i}
          className="heart"
          style={{
            top,
            left,
            fontSize,
            animationDelay,
          }}
        >
          ❤️
        </div>
      );
    }
    return heartsArray;
  };

  // Update hearts' positions periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHearts(generateRandomHearts());
    }, 5000);

    return () => clearInterval(intervalId); // Clean up the interval
  }, []);

  return (
    <div style={{ backgroundImage: "url('/assets/images/bgImg.jpg')", backgroundSize: "cover", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {step === 1 && <Scrapbook onComplete={() => setStep(2)} startAudio={startAudio} audioStarted={audioStarted} />}
      {step === 2 && <Quiz onFinish={(score) => { setQuizScore(score); setStep(3); }} />}
      {step === 3 && <Letter onDone={() => setStep(1)} />}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        {!audioPaused && audioStarted && (
          <IconButton variant="outlined" onClick={pauseAudio} disabled={!audioStarted} sx={{ mx: 1 }}>
            <Tooltip title="Pause Song">
              <PauseIcon fontSize="large" sx={{ color: pink[500] }} />
            </Tooltip>
          </IconButton>
        )}
        {audioPaused && audioStarted && (
          <IconButton variant="outlined" onClick={playAudio} disabled={!audioStarted}>
            <Tooltip title="Play Music">
              <PlayArrowIcon fontSize="large" sx={{ color: pink[500] }} />
            </Tooltip>
          </IconButton>
        )}
        {audioStarted && (
          <IconButton variant="outlined" onClick={nextSong} sx={{ mx: 1 }}>
            <Tooltip title="Next Music">
              <SkipNextIcon fontSize="large" sx={{ color: pink[500] }} />
            </Tooltip>
          </IconButton>
        )}
      </Box>

      {/* Floating Hearts */}
      {(step === 1 || step === 3) && <FloatingHearts>{hearts}</FloatingHearts>}
    </div>
  );
}

export default App;
