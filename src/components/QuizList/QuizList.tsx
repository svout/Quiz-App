import React from "react";
import { QuizListProps } from "../../models/models";
import "tailwindcss/tailwind.css";

const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold">{quiz.title}</h2>
          </div>
          <div className="flex justify-start p-4 border-t border-gray-200">
            <button
              onClick={() => onSelect(quiz.id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Start Quiz
            </button>
            <button
              onClick={() => onEdit(quiz)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(quiz.id)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
