import React, { useState, useEffect } from 'react';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import timeUpSound from './sounds/time-up.mp3';
import backgroundMusic from './sounds/background-music.mp3';

const questions = [
  {
    question: 'Which of the following has a regular repeated molecular pattern in three-dimensional space?',
    options: ['Solid and liquids', 'Solids', 'Liquids and gases', 'Gases'],
    correctAnswer: 1, // Index of the correct answer (Solids)
  },
  // Add more questions here
];

function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds for each question
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [backgroundAudio, setBackgroundAudio] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Play background music when the component mounts
    const bgMusic = new Audio(backgroundMusic);
    bgMusic.loop = true;
    bgMusic.play();
    setBackgroundAudio(bgMusic);

    return () => {
      bgMusic.pause(); // Pause background music when the component unmounts
    };
  }, []);

  // Countdown timer for 60 seconds
  useEffect(() => {
    if (timer > 0 && !showCorrectAnswer && !showTimeUp) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !selectedAnswer) {
      handleTimeUp();
    }
  }, [timer, selectedAnswer, showCorrectAnswer, showTimeUp]);

  // Handle answer selection
  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setShowCorrectAnswer(true);

    if (index === currentQuestion.correctAnswer) {
      // Play correct sound
      new Audio(correctSound).play();
    } else {
      // Play wrong sound
      new Audio(wrongSound).play();
    }

    // Show the result for 1 second before allowing next question
    setTimeout(() => {
      setTimer(60); // Reset timer
      setShowCorrectAnswer(false);
      setSelectedAnswer(null);
    }, 1000);
  };

  // Handle time up scenario
  const handleTimeUp = () => {
    setShowTimeUp(true);
    // Play time-up sound
    new Audio(timeUpSound).play();

    setTimeout(() => {
      setShowTimeUp(false);
      goToNextQuestion();
      setTimer(60); // Reset the timer
    }, 2000); // Show 'Time Up' for 2 seconds
  };

  // Go to the next question or finish the quiz
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Quiz completed!');
      // Stop background music
      if (backgroundAudio) backgroundAudio.pause();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Matter In Our Surrounding Quiz 1</h1>

      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
        <div className="text-center mb-6">
          <h2 className="text-xl">
            Time Remaining: <span className="text-pink-500">{timer}</span> {/* Display the timer */}
          </h2>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>

        {/* Question */}
        <div className="mb-4">
          <p>{currentQuestion.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`bg-gray-700 p-4 rounded-lg w-full text-left 
              ${
                selectedAnswer === index
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : ''
              }
              ${showCorrectAnswer && index === currentQuestion.correctAnswer ? 'bg-green-500' : ''}
              `}
              disabled={selectedAnswer !== null} // Disable after selecting an answer
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>

        {/* Time Up Popup */}
        {showTimeUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg text-black">
              <h2 className="text-2xl font-bold">Time's Up!</h2>
            </div>
          </div>
        )}

        {/* Next Question Button */}
        {showCorrectAnswer && (
          <button
            onClick={goToNextQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-6 rounded-lg w-full"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
