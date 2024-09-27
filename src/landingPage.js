import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundMusic from './sounds/background-music.mp3'; // Import the background music

function Main() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Play background music after user interaction
    const bgMusic = new Audio(backgroundMusic);
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play();

    // Navigate to the HomePage (quiz start page)
    navigate('/home');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-lg font-bold">QUIZ</div>
          <ul className="flex space-x-6">
            <li><a href="#home" className="text-gray-600">Home</a></li>
            <li><a href="#about" className="text-gray-600">About Us</a></li>
            <li><a href="#team" className="text-gray-600">Our Team</a></li>
            <li><a href="#gallery" className="text-gray-600">Gallery</a></li>
            <li><a href="#order" className="text-gray-600">Order</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Quiz Section */}
      <section className="container mx-auto my-12 p-8 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-12">
        {/* Left Section with Icons */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              {/* Correct Answer Icon */}
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="bg-yellow-100 p-4 rounded-full">
              {/* Question Icon */}
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h4m-2-4v4m2 5v6m0 0l-2-2m2 2h2"></path>
              </svg>
            </div>
          </div>
          <div className="mt-4">
            {/* Quiz Illustration */}
            <svg className="w-64 h-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM16 3h-4a2 2 0 00-2 2v2h8V5a2 2 0 00-2-2z"></path>
            </svg>
          </div>
        </div>

        {/* Right Section with Laptop and People */}
        <div className="flex flex-col items-center space-y-6">
          <div>
            {/* Laptop Illustration */}
            <svg className="w-72 h-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v10m0-10l9-5m-9 5l-9-5m9 5v10m0-10L3 9m18 5l-9 5m9-5l-9-5"></path>
            </svg>
          </div>
          <div className="flex items-center">
            {/* People Illustration */}
            <svg className="w-48 h-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 9l-4 4-4-4m0 6l4 4 4-4m0-12h-4m2 10v6m0 0H8m8 0h2m0-2h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2v4"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="flex flex-col items-center mt-6 space-y-6">
        {/* Start Quiz Button */}
        <button 
          onClick={handleStartQuiz} // Link the function to the button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Start Quiz
        </button>

        {/* Show More Button */}
        <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out">
          Show More
        </button>
      </div>
    </div>
  );
}

export default Main;
