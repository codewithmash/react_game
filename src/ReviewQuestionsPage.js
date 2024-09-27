import React from 'react';
import { useLocation } from 'react-router-dom'; // For accessing passed state

const QuizReview = () => {
  const location = useLocation();
  const { questions, userAnswers } = location.state || { questions: [], userAnswers: [] };

  return (
    <div className="bg-black text-white min-h-screen p-5">
      <h1 className="text-4xl mb-6 text-yellow-400">Review Questions</h1>

      <div className="grid grid-cols-2 gap-4">
        {questions.map((question, index) => (
          <div key={index} className="bg-gray-800 p-5 rounded-md shadow-lg">
            <h2 className="text-lg mb-3">Ques {index + 1}:</h2>
            <p className="mb-2">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, optIndex) => {
                const isCorrectAnswer = optIndex === question.correctAnswer;
                const isUserAnswer = optIndex === userAnswers[index];

                return (
                  <div
                    key={optIndex}
                    className={`p-2 rounded-md flex justify-between ${
                      isCorrectAnswer
                        ? 'bg-green-600' // Correct answer
                        : isUserAnswer
                        ? 'bg-red-600' // Incorrect answer chosen by user
                        : 'bg-gray-700' // Unselected options
                    }`}
                  >
                    <span>{String.fromCharCode(65 + optIndex)}. {option}</span>
                    {isCorrectAnswer && <span>Correct Answer</span>}
                    {isUserAnswer && !isCorrectAnswer && <span>Your Answer</span>}
                  </div>
                );
              })}
            </div>

            {/* Indicator for correct or incorrect */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-2">
                <span className={`p-2 rounded-full ${userAnswers[index] === question.correctAnswer ? 'bg-green-600' : 'bg-red-600'}`}>
                  {userAnswers[index] === question.correctAnswer ? '✔' : '✘'}
                </span>
                <span>{/* Optional: Add time spent per question here */}</span>
              </div>
              <div className="flex space-x-2">
                <span>⚫ {index + 1}</span> {/* Question number or score */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizReview;
