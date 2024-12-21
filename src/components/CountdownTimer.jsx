import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa6";

const CountdownTimer = ({ initialSeconds, onTimeChange }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the timer when it reaches zero

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, [timeLeft]);

  useEffect(() => {
    // Pass the updated timeLeft to the parent component
    if (onTimeChange) {
      onTimeChange(timeLeft);
    }
  }, [timeLeft, onTimeChange]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="border-2 border-theme-black bg-theme-pink w-fit px-3 py-1 rounded-xl">
      <div className="flex items-center text-xl">
        <FaClock className="mr-1 w-5 h-5" />

        {formatTime(timeLeft)}
      </div>
      {timeLeft === 0 && <p>Time's up!</p>}
    </div>
  );
};

export default CountdownTimer;
