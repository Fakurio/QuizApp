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

  const startTimer = () => {
    if (onTimerStart) {
      onTimerStart();
    }
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          if (onTimerEnd) {
            setTimeout(onTimerEnd, 0);
          }
          clearInterval(interval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return interval;
  };
  useEffect(() => {
    const interval = startTimer();
    return () => clearInterval(interval);
  }, []);
  return <progress className="timer" max={duration} value={time}></progress>;
};

export default Timer;
