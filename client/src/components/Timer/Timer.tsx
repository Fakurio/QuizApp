import "./Timer.css";
import { useEffect, useState } from "react";

interface TimerProps {
  startTime: string;
  duration: number;
  onTimerEnd?: () => void;
  onTimerStart?: () => void;
}

const Timer = ({
  startTime,
  duration,
  onTimerEnd,
  onTimerStart,
}: TimerProps) => {
  const timeLeft =
    duration - Math.floor((Date.now() - parseInt(startTime)) / 1000);
  const [time, setTime] = useState(timeLeft);
  let interval: NodeJS.Timeout;

  const startTimer = () => {
    if (onTimerStart) {
      onTimerStart();
    }
    interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          if (onTimerEnd) {
            onTimerEnd();
          }
          clearInterval(interval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => clearInterval(interval);
  }, []);
  return <progress className="timer" max={duration} value={time}></progress>;
};

export default Timer;
