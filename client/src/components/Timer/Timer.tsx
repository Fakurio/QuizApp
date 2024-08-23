import "./Timer.css";
import { useEffect, useState } from "react";

interface TimerProps {
  startTime: string;
  duration: number;
}

const Timer = ({ startTime, duration }: TimerProps) => {
  const timeLeft =
    duration - Math.floor((Date.now() - parseInt(startTime)) / 1000);
  const [time, setTime] = useState(timeLeft);
  let interval: NodeJS.Timeout;

  const startTimer = () => {
    interval = setInterval(() => {
      if (time <= 0) {
        console.log("Time's up!");
        clearInterval(interval);
      } else {
        setTime((prev) => prev - 1);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => clearInterval(interval);
  });
  return <div className="timer">{time}</div>;
};

export default Timer;
