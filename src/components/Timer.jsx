import React, { useEffect, useState } from 'react';

const Timer = ({ createdAt, setLoading }) => {
  const [countdown, setCountdown] = useState("");
  let interval = null;

  console.log("Timer runs");

  const startTimer = () => {
    const oneDayInMillis = 1 * 24 * 60 * 60 * 1000; // One day in milliseconds
    const biddingEndTime = new Date(createdAt).getTime() + oneDayInMillis;

    interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = biddingEndTime - currentTime;

      if (remainingTime > 0) {
        const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        setLoading(false);
      } else {
        setCountdown("Bidding has ended");
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, setLoading]); // Also include setLoading in the dependency array

  return <div>Timer: {countdown}</div>;
};

export default Timer;
