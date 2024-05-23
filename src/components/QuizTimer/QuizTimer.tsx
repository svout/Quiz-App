import React, { useEffect, useState } from "react";
import { QuizTimerProps } from "../../models/models";

const QuizTimer: React.FC<QuizTimerProps> = ({ timeInSeconds, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(timeInSeconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeEnd();
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, onTimeEnd]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 place-items-start">
      {formatTime(timeLeft)}
    </div>
  );
};

export default QuizTimer;
