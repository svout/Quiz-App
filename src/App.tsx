import React, { useState } from "react";
import { QuizData } from "./models/models";
import QuizList from "./components/QuizList/QuizList";
import Quiz from "./components/Quiz/Quiz";
import QuizForm from "./components/QuizForm/QuizForm";
import EditQuizForm from "./components/EditQuizForm/EditQuizForm";
import "tailwindcss/tailwind.css";

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizData[]>([
    {
      id: "quiz1",
      title: "React.js",
      questions: [
        {
          question: "What is React.js?",
          options: [
            "A server-side scripting language",
            "A JavaScript library for building user interfaces",
            "A database management system",
            "A markup language for web development",
          ],
          answer: "A JavaScript library for building user interfaces",
        },
        {
          question: "What is JSX in React.js?",
          options: [
            "JavaScript External XML",
            "JavaScript XML",
            "JavaScript Extension",
            "JavaScript eXtended",
          ],
          answer: "JavaScript XML",
        },
        {
          question: "What is the purpose of virtual DOM in React.js?",
          options: [
            "To manipulate HTML elements directly",
            " To optimize memory usage",
            "To improve rendering performance",
            "To provide better support for CSS animations",
          ],
          answer: "To improve rendering performance",
        },
        {
          question:
            "Which of the following is NOT a component lifecycle method in React.js?",
          options: [
            "componentDidMount()",
            "componentWillUpdate()",
            "componentDidUpdate()",
            "renderComponent()",
          ],
          answer: "renderComponent()",
        },
        {
          question: "What is the purpose of state in React.js?",
          options: [
            "To store data that can be accessed globally",
            "To manage the UI of a component",
            "To define the initial properties of a component",
            "To maintain and update the internal state of a component",
          ],
          answer: "To maintain and update the internal state of a component",
        },
        {
          question: "What is Redux in the context of React.js?",
          options: [
            "A form of responsive design",
            "A state management library",
            "A routing library",
            "A testing framework",
          ],
          answer: "A state management library",
        },
      ],
    },
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<QuizData | null>(null);
  const [showNewQuizForm, setShowNewQuizForm] = useState<boolean>(false);

  const addQuiz = (newQuiz: QuizData) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const updateQuiz = (updatedQuiz: QuizData) => {
    setQuizzes(
      quizzes.map((quiz) => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
      {!selectedQuiz ? (
        <>
          {showNewQuizForm ? (
            <QuizForm
              onAddQuiz={addQuiz}
              onCancel={() => setShowNewQuizForm(false)}
            />
          ) : editingQuiz ? (
            <EditQuizForm
              quiz={editingQuiz}
              onUpdateQuiz={updateQuiz}
              onCancel={() => setEditingQuiz(null)}
            />
          ) : (
            <>
              <QuizList
                quizzes={quizzes}
                onSelect={setSelectedQuiz}
                onDelete={deleteQuiz}
                onEdit={setEditingQuiz}
              />
              <button
                onClick={() => setShowNewQuizForm(true)}
                className="mt-4 p-2 bg-green-500 text-white rounded"
              >
                Add New Quiz
              </button>
            </>
          )}
        </>
      ) : (
        <Quiz
          quiz={quizzes.find((quiz) => quiz.id === selectedQuiz)!}
          onBack={() => setSelectedQuiz(null)}
        />
      )}
    </div>
  );
};

export default App;
