import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundMusic from './sounds/background-music.mp3'; // Import the background music

function HomePage() {
  const navigate = useNavigate();
  
  const handlePlayClick = () => {
    // Play background music after user interaction
    const bgMusic = new Audio(backgroundMusic);
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play();

    // Navigate to the countdown page
    navigate('/countdown');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-800 to-blue-900 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content container */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg text-center p-10 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-white mb-4">
          Matter In Our Surrounding Quiz 1
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          Answer these simple questions correctly and earn coins
        </p>
        <button
          onClick={handlePlayClick}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          Play Now
        </button>
      </div>

      {/* Floating gradient effect */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-bl from-pink-500 to-purple-700 rounded-full opacity-30 blur-2xl"></div>
    </div>
  );
}


export default HomePage;
