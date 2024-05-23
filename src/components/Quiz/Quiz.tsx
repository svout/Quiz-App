import React, { useState } from "react";
import QuizTimer from "../QuizTimer/QuizTimer";
import { QuizProps } from "../../models/models";

const Quiz: React.FC<QuizProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const handleAnswer = (selectedOption: string) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleTimeEnd = () => {
    setQuizCompleted(true);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{quiz.title}</h2>
      {!quizCompleted ? (
        <>
          <QuizTimer timeInSeconds={60} onTimeEnd={handleTimeEnd} />
          <div>
            <h3 className="text-lg font-medium mb-2">
              {currentQuestion.question}
            </h3>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="px-4 py-2 mx-1 bg-blue-500  text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-lg font-medium">
            Quiz completed! Your score: {score}/{quiz.questions.length}
          </p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Back to Quiz List
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
