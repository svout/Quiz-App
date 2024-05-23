import React, { useState } from "react";
import { Question, QuizData, NewQuizFormProps } from "../../models/models";

const QuizForm: React.FC<NewQuizFormProps> = ({ onAddQuiz, onCancel }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", ""], answer: "" },
  ]);

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newQuestions = [...questions];
    if (field === "question") {
      newQuestions[index].question = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("_")[1]);
      newQuestions[index].options[optionIndex] = value;
    } else if (field === "answer") {
      newQuestions[index].answer = value;
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", ""], answer: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuiz: QuizData = {
      id: `quiz${Date.now()}`,
      title,
      questions,
    };
    onAddQuiz(newQuiz);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
      </div>
      {questions.map((q, index) => (
        <div key={index} className="space-y-2">
          <div>
            <label className="block mb-1">Question {index + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              className="p-2 border rounded w-full"
              required
            />
          </div>
          {q.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label className="block mb-1">Option {optionIndex + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) =>
                  handleQuestionChange(
                    index,
                    `option_${optionIndex}`,
                    e.target.value
                  )
                }
                className="p-2 border rounded w-full"
                required
              />
            </div>
          ))}
          <div>
            <label className="block mb-1">Correct Answer</label>
            <input
              type="text"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(index, "answer", e.target.value)
              }
              className="p-2 border rounded w-full"
              required
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addQuestion}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Add Question
      </button>
      <div className="flex space-x-2 mt-4">
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Save Quiz
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
