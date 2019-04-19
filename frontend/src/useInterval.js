import { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const [startTime] = useState(Date.now());

  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick(currentTime) {
      savedCallback.current(currentTime - startTime);
    }

    const id = setInterval(() => tick(Date.now()), delay);
    return () => clearInterval(id);
  }, [delay, startTime]);
}

export default useInterval;
