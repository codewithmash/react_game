import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CountdownPage from './CountdownPage';
import QuizPage from './QuizPage';
import ResultsPage from './ResultsPage'; // Import the ResultsPage component
import ReviewQuestionsPage from './ReviewQuestionsPage'; // Import the ReviewQuestionsPage component
import LeaderboardPage from './LeaderboardPage';
import backgroundMusic from './sounds/background-music.mp3';
import Main from './landingPage';



function App() {
  const [bgMusic] = useState(new Audio(backgroundMusic)); // Store audio object in state
  const [musicStarted, setMusicStarted] = useState(false); // Flag to track if music has started

  useEffect(() => {
    if (musicStarted) {
      // Set the audio properties
      bgMusic.loop = true;
      bgMusic.volume = 0.2;

      // Play the background music
      bgMusic.play().catch((error) => {
        console.log('Error playing background music:', error);
      });

      return () => {
        // Stop music when the component unmounts
        bgMusic.pause();
        bgMusic.currentTime = 0;
      };
    }
  }, [bgMusic, musicStarted]);

  const handleUserInteraction = () => {
    if (!musicStarted) {
      setMusicStarted(true); // Start the music after user interaction
    }
  };

  return (
    <div onClick={handleUserInteraction}> {/* Any click starts the music */}
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          {/* Pass dynamic data to ResultsPage via state */}
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/review" element={<ReviewQuestionsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
