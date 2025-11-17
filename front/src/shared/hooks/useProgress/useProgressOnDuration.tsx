import { useEffect, useRef } from 'react';

interface ProgressOnDurationProps {
  duration: number; //s
  onComplete?: () => void;
}
export const useProgressOnDuration = ({
  duration, onComplete,
}: ProgressOnDurationProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.width = '0'; // скидаємо при mount

    // for image
    const start = performance.now();
    const step = () => {
      const elapsed = (performance.now() - start) / 1000;
      const p = Math.min((elapsed / duration) * 100, 100);
      progressRef.current!.style.width = `${p}%`;

      if(p >= 100) {
        onComplete?.()
      }

      if (p < 100) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [duration, onComplete]);

  return { progressRef }
}