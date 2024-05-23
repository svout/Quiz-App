export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface QuizProps {
  quiz: QuizData;
  onBack: () => void;
}

export interface QuizListProps {
  quizzes: Quiz[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (quiz: Quiz) => void;
}

export interface QuizData {
  id: string;
  title: string;
  questions: Question[];
}

export interface NewQuizFormProps {
  onAddQuiz: (newQuiz: QuizData) => void;
  onCancel: () => void;
}

export interface EditQuizFormProps {
  quiz: QuizData;
  onUpdateQuiz: (updatedQuiz: QuizData) => void;
  onCancel: () => void;
}

export interface QuizTimerProps {
  timeInSeconds: number;
  onTimeEnd: () => void;
}
