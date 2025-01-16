// App.js
import React, { useState } from "react";
import Scrapbook from "./components/Scrapbook";
import Quiz from "./components/Quiz";
import Letter from "./components/Letter";
import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { pink } from "@mui/material/colors";

function App() {
  const [step, setStep] = useState(1);
  const [quizScore, setQuizScore] = useState(0);
  // List of songs to play
  const songs = [
    "/assets/audio/A-Thousand-Years.mp3",
    "/assets/audio/Another-Song.mp3",  // Add the path to the next song
  ];

  const [audioStarted, setAudioStarted] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Start playing the audio
  const startAudio = () => {
    const newAudio = new Audio(songs[currentSongIndex]);
    newAudio.loop = true;
    newAudio.play();
    setAudio(newAudio);
    setAudioStarted(true);
  };

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

  // Skip to the next song
  const nextSong = () => {
    if (audio) {
      audio.pause();
    }
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    const newAudio = new Audio(songs[nextIndex]);
    newAudio.loop = true;
    newAudio.play();
    setAudio(newAudio);
  };

  return (
    <div style={{ backgroundImage: "url('/assets/images/bgImg.jpg')", backgroundSize: "cover", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {step === 1 && <Scrapbook onComplete={() => setStep(2)} startAudio={startAudio} audioStarted={audioStarted} />}
      {step === 2 && <Quiz onFinish={(score) => { setQuizScore(score); setStep(3); }} />}
      {step === 3 && <Letter onDone={() => setStep(1)} />}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        {!audioPaused && (<IconButton variant="outlined" onClick={pauseAudio} disabled={!audioStarted} sx={{ mx: 1 }}>
          <Tooltip title="Pause Song">
            <PauseIcon fontSize="large" sx={{ color: pink[500] }} />
          </Tooltip>
        </IconButton>)}
        {audioPaused && (<IconButton variant="outlined" onClick={playAudio} disabled={!audioStarted}>
          <Tooltip title="Play Music">
            <PlayArrowIcon fontSize="large" sx={{ color: pink[500] }} />
          </Tooltip>
        </IconButton>)}
        <IconButton variant="outlined" onClick={nextSong} sx={{ mx: 1 }}>
          <Tooltip title="Next Music">
            <SkipNextIcon fontSize="large" sx={{ color: pink[500] }} />
          </Tooltip>
        </IconButton>
      </Box>
    </div>
  );
}

export default App;
