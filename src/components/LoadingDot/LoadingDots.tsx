import { useState, useEffect } from 'react';

function LoadingDots() {
  const [dots, setDots] = useState(''); // Initial state is an empty string

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const maxDots = 3; // Set the maximum number of dots

    // Function to update the number of dots and trigger animation
    const updateDots = () => {
      setDots((prevDots) => {
        // Increment the number of dots, reset to 1 if it reaches max
        if (prevDots.length >= maxDots) {
          return '.';
        }
        return `${prevDots}.`;
      });
    };

    // Start the animation by updating dots every 500 milliseconds
    // eslint-disable-next-line prefer-const
    timer = setInterval(updateDots, 500);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return <div>{dots}</div>;
}

export default LoadingDots;
