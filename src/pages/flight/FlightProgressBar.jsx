import React, { useState, useEffect } from 'react';
import { FaPlane } from 'react-icons/fa';
import './FlightProgressBar.css';
import flightImg from "../../images/flights/flightProgressimg.svg"

const FlightProgressBar = ({ duration, resultsAvailable }) => {
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
  
    useEffect(() => {
      if (resultsAvailable) {
        setProgress(100);
        return;
      }
      
  
      const interval = 50;
      const increment = (interval / duration) * 100;
  
      const updateProgress = () => {
        setProgress((prevProgress) => {
          if (prevProgress + increment >= 75) {
            setPaused(true);
            return 75;
          }
          return prevProgress + increment;
        });
      };
  
      if (!paused) {
        const progressInterval = setInterval(updateProgress, interval);
        return () => clearInterval(progressInterval);
      }
    }, [duration, resultsAvailable, paused]);
  
    useEffect(() => {
      if (resultsAvailable && paused) {
        setProgress(100);
      }
    }, [resultsAvailable, paused]);


    return (
        <>
            {
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}>
                        <img style={{ height: "30px" }} src=
                            {flightImg} className="plane-icon" />
                    </div>
                </div>}
        </>
    );
};

export default FlightProgressBar;
