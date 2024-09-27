import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMedal, FaCheckCircle, FaTimesCircle, FaClock, FaStopwatch, FaTrophy } from 'react-icons/fa';
import celebrationGif from './img/celebration.gif';

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { coins, correct, incorrect, percentage, timeSpent, timePerQuestion, liveRank, questions, selectedAnswers } = location.state;

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (percentage >= 80) { // Threshold for celebration
      console.log("Celebration triggered"); // Log to check if condition is met
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 7000); // Celebration for 7 seconds
    }
  }, [percentage]);

  const handleReviewQuestions = () => {
    navigate('/review', {
      state: {
        questions: questions,
        userAnswers: selectedAnswers,
      },
    });
  };

  const handleShareScore = () => {
    const scoreMessage = `I scored ${coins} coins in the Matter In Our Surrounding Quiz! Check it out!`;
    navigator.share({
      title: 'My Quiz Score',
      text: scoreMessage,
      url: window.location.href,
    })
    .then(() => console.log('Share was successful.'))
    .catch((error) => console.error('Error sharing:', error));
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-6 relative">
      <h1 className="text-4xl font-bold mb-8">Quiz Results</h1>

      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <img src={celebrationGif} alt="Celebration" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center z-10">
        <div className="grid grid-cols-2 gap-4 text-lg mb-4">
          {/* Display score details */}
          <div className="flex flex-col items-center">
            <FaMedal className="text-yellow-400 text-3xl" />
            <p className="mt-2">Coins Earned 🪙</p>
            <p className="text-2xl">🪙 {coins}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTrophy className="text-yellow-400 text-3xl" />
            <p className="mt-2">Your Score</p>
            <p className="text-2xl">{coins}</p>
          </div>
          {/* More score-related details */}
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-400 text-3xl" />
            <p className="mt-2">Correct</p>
            <p className="text-2xl">{correct}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-red-400 text-3xl" />
            <p className="mt-2">Incorrect</p>
            <p className="text-2xl">{incorrect}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaClock className="text-blue-400 text-3xl" />
            <p className="mt-2">Time Spent</p>
            <p className="text-2xl">{timeSpent} sec</p>
          </div>
          <div className="flex flex-col items-center">
            <FaStopwatch className="text-blue-400 text-3xl" />
            <p className="mt-2">Time/Ques</p>
            <p className="text-2xl">{timePerQuestion} sec</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMedal className="text-yellow-400 text-3xl" />
            <p className="mt-2">Live Rank</p>
            <p className="text-2xl">{liveRank}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMedal className="text-yellow-400 text-3xl" />
            <p className="mt-2">Percentage</p>
            <p className="text-2xl">{percentage}%</p>
          </div>
        </div>

        <button
          onClick={handleShareScore}
          className="bg-blue-500 hover:bg-blue-600 w-full text-white px-6 py-2 rounded-lg mb-4"
        >
          Share Score
        </button>

        <button
          onClick={handleReviewQuestions}
          className="bg-green-500 hover:bg-green-600 w-full text-white px-6 py-2 rounded-lg mb-4"
        >
          Review Questions
        </button>

        <button
          onClick={handleLeaderboard}
          className="bg-gray-700 hover:bg-gray-800 w-full text-white px-6 py-2 rounded-lg"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
