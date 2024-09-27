import React, { useState, useEffect } from 'react';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import timeUpSound from './sounds/time-up.mp3';
import { useNavigate } from 'react-router-dom';
import './QuizPage.css'; // Import CSS for animations

const questions = [
  {
    question: "The name 'Pandas' is derived from the term:",
    options: ["Panel Data", "Panel Series", "Python Document", "Panel Data Frame"],
    correctAnswer: 0,
  },
  {
    question: "The command to install pandas is:",
    options: ["install pip pandas", "install pandas", "pip pandas", "pip install pandas"],
    correctAnswer: 3,
  },
  {
    question: "Python pandas was developed by:",
    options: ["Guido van Rossum", "Wes McKinney", "Yukihiro Matsumoto", "James Gosling"],
    correctAnswer: 1,
  },
  {
    question: "Pandas Series is:",
    options: ["2 Dimensional", "3 Dimensional", "1 Dimensional", "None of the above"],
    correctAnswer: 2,
  },
  {
    question: "Which of the following is used to create a DataFrame?",
    options: ["pd.Series()", "pd.DataFrame()", "pd.Panel()", "pd.Index()"],
    correctAnswer: 1,
  },
  {
    question: "Which method is used to read a CSV file in pandas?",
    options: ["pd.read_csv()", "pd.read_excel()", "pd.read_json()", "pd.read_table()"],
    correctAnswer: 0,
  },
  {
    question: "How do you access the first few rows of a DataFrame?",
    options: ["df.head()", "df.tail()", "df.start()", "df.top()"],
    correctAnswer: 0,
  },
  {
    question: "Which function is used to concatenate DataFrames?",
    options: ["pd.join()", "pd.concat()", "pd.append()", "pd.combine()"],
    correctAnswer: 1,
  },
  {
    question: "Which of these can be used to group data in pandas?",
    options: ["groupby", "aggregate", "apply", "transform"],
    correctAnswer: 0,
  },
  {
    question: "Pandas is primarily used for:",
    options: ["Data Analysis", "Web Development", "Machine Learning", "Game Development"],
    correctAnswer: 0,
  }
];

function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Array to store selected answers
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds for each question
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false); // Next button enabled only after clicking it
  const [coins, setCoins] = useState(0); // Track the coins
  const [animateCoins, setAnimateCoins] = useState(false); // To trigger coin animation
  const navigate = useNavigate(); // Use navigate for routing

  const currentQuestion = questions[currentQuestionIndex];

  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);
  const timeUpAudio = new Audio(timeUpSound);

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

  // Play audio only when necessary
  const playSound = (sound) => {
    sound.play().catch((error) => console.error('Error playing sound:', error));
  };

  // Handle answer selection
  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setShowCorrectAnswer(true);
    setNextEnabled(true); // Enable the next button after answering

    // Store the selected answer
    setSelectedAnswers((prevAnswers) => [
      ...prevAnswers,
      index
    ]);

    if (index === currentQuestion.correctAnswer) {
      playSound(correctAudio); // Play correct answer sound
      setCoins(coins + 3); // Add 3 coins for correct answer
      triggerCoinAnimation(); // Trigger the coin animation
    } else {
      playSound(wrongAudio); // Play wrong answer sound
      setCoins(coins - 1); // Deduct 1 coin for wrong answer
    }

    setTimeout(() => {
      setShowCorrectAnswer(false);
    }, 1000);
  };

  // Handle time up scenario
  const handleTimeUp = () => {
    setShowTimeUp(true);
    playSound(timeUpAudio); // Play time-up sound

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
      handleQuizCompletion(); // Redirect to the results page
    }
    setTimer(60); // Reset the timer for the next question
    setSelectedAnswer(null);
    setNextEnabled(false); // Disable next button until new answer
  };

  // Trigger coin animation when coins are added
  const triggerCoinAnimation = () => {
    setAnimateCoins(true);
    setTimeout(() => {
      setAnimateCoins(false); // End animation after 1 second
    }, 1000);
  };

  const handleQuizCompletion = () => {
    // Navigate to the results page, passing necessary quiz data
    navigate('/results', {
      state: {
        coins: coins,
        correct: selectedAnswers.filter((ans, index) => ans === questions[index].correctAnswer).length, // Calculate correct answers
        incorrect: questions.length - selectedAnswers.filter((ans, index) => ans === questions[index].correctAnswer).length,
        percentage: (selectedAnswers.filter((ans, index) => ans === questions[index].correctAnswer).length / questions.length) * 100,
        timeSpent: 60 * questions.length - timer, // Example calculation for time spent
        liveRank: 305, // Dummy rank, replace with actual logic
        questions: questions,
        selectedAnswers: selectedAnswers, // Pass selected answers
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">
      <h1 className="text-3xl font-bold mb-8">Matter In Our Surrounding Quiz</h1>

      {/* Coins Display in Upper-Right Corner */}
      <div className={`coins-display ${animateCoins ? 'animate-coins' : ''}`}>
        🪙 {coins}
      </div>

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
              ${showCorrectAnswer && index === currentQuestion.correctAnswer ? 'bg-green-500' : ''}`}
              disabled={selectedAnswer !== null} // Disable after selecting an answer
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>

        {/* Next Button */}
        {nextEnabled && (
          <button
            onClick={goToNextQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg"
          >
            Next Question
          </button>
        )}

        {/* Time Up Popup */}
        {showTimeUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg text-black">
              <h2 className="text-2xl font-bold">Time's Up!</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
