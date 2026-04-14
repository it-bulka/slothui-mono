import { useRef, useCallback } from 'react';

export const useLongPress = (callback: () => void, delay = 500) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const start = useCallback(() => {
    timer.current = setTimeout(callback, delay);
  }, [callback, delay]);

  const cancel = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchMove: cancel,
  };
};
