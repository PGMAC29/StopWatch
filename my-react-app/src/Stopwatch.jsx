import { useEffect, useState, useRef } from "react";
import "./index.css";

function Stopwatch() {
  const [isRunning, setRunning] = useState(false);
  const [elapsedTime, setElapsed] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function handleStart() {
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function handleStop() {
    setRunning(false);
  }

  function handleReset() {
    clearInterval(intervalIdRef.current);
    setElapsed(0);
    setRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let secs = Math.floor((elapsedTime / 1000) % 60);
    let milli = Math.floor((elapsedTime % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${milli
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        <span>{formatTime()}</span>
        <br />
        <div className="buttons">
          <button className="start" onClick={handleStart}>
            Start
          </button>
          <button className="stop" onClick={handleStop}>
            Stop
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
