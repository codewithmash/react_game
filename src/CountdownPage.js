import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CountdownPage() {
  const [countdown, setCountdown] = useState(3);  // Starting countdown from 3
  const [showGoMessage, setShowGoMessage] = useState(false); // For showing "Go!"
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);  // Clear timer at 1
          setShowGoMessage(true); // Show "Go!" message after 1
          setTimeout(() => {
            navigate('/quiz'); // Redirect to quiz page after "Go!"
          }, 1000); // Redirect after 1 second of "Go!"
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);  // Cleanup interval on unmount
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-blue-900 to-black text-white">
      <div
        className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold transform transition-transform duration-500 ease-in-out ${
          countdown === 3
            ? 'scale-125 opacity-100'
            : countdown === 2
            ? 'scale-110 opacity-90'
            : countdown === 1 && !showGoMessage
            ? 'scale-95 opacity-80'
            : showGoMessage
            ? 'scale-100 opacity-100 animate-pulse'
            : 'scale-100 opacity-0'
        }`}
      >
        {showGoMessage ? 'Go!' : countdown}
      </div>

      {/* Floating gradient blobs for effect */}
      <div className="absolute -top-24 -left-24 sm:-top-32 sm:-left-32 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-tr from-pink-500 to-purple-700 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute -bottom-24 -right-24 sm:-bottom-32 sm:-right-32 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-bl from-blue-400 to-purple-500 rounded-full opacity-30 blur-2xl"></div>
    </div>
  );
}

export default CountdownPage;
