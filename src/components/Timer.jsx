import React, { useEffect, useState } from 'react';

const Timer = ({ createdAt, setLoading, setHasBiddingEnded }) => {

  const [countdown, setCountdown] = useState(0);
  let interval = null;

  const updateTimer = () => {
    const oneDayInMillis = 1 * 24 * 60 * 60 * 1000; // One day in milliseconds
    const biddingEndTime = new Date(createdAt).getTime() + oneDayInMillis;

    const currentTime = Date.now();
    const remainingTime = biddingEndTime - currentTime;

    if (remainingTime > 0) {
      const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setCountdown("Bidding has ended");
      setHasBiddingEnded(true);
    }
  };

  useEffect(() => {
    updateTimer(); // Call the function immediately after rendering

    interval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
      setLoading(false); // Move setLoading here if needed
    };
  }, [createdAt]); // Only dependent on createdAt

  return <div className='md:py-0 py-5'>Timer: {countdown}</div>;
};

export default Timer;
