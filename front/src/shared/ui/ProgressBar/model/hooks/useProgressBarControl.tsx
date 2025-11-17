import { useRef, useEffect } from 'react';

export const useProgressBarControl = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 6; // секунди
    const start = performance.now();

    const interval = setInterval(() => {
      if (!progressRef.current) return;

      const elapsed = (performance.now() - start) / 1000;
      const p = Math.min((elapsed / duration) * 100, 100);

      progressRef.current.style.width = `${p}%`;

      if (p >= 100) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return { progressRef }
}