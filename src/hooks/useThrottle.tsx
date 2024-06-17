import { useState, useEffect, useRef } from 'react';

const useThrottle = <T,>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(timer);
    };
  }, [value, limit]);

  return throttledValue;
};

export default useThrottle;
