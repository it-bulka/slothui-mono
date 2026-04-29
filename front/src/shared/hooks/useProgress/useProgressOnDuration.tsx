import { useEffect, useRef } from 'react';

interface ProgressOnDurationProps {
  duration: number; //s
  onComplete?: () => void;
  onStart?: () => void;
  isPaused?: boolean;
}
export const useProgressOnDuration = ({
  duration, onComplete, onStart, isPaused = false,
}: ProgressOnDurationProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const onStartRef = useRef(onStart);
  const isPausedRef = useRef(isPaused);
  onCompleteRef.current = onComplete;
  onStartRef.current = onStart;
  isPausedRef.current = isPaused;

  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.width = '0';
    let started = false;
    let rafId: number;
    let totalPausedMs = 0;
    let pauseStartedAt: number | null = null;

    const start = performance.now();
    const step = () => {
      if (!progressRef.current) return;

      if (isPausedRef.current) {
        if (pauseStartedAt === null) pauseStartedAt = performance.now();
        rafId = requestAnimationFrame(step);
        return;
      }
      if (pauseStartedAt !== null) {
        totalPausedMs += performance.now() - pauseStartedAt;
        pauseStartedAt = null;
      }

      const elapsed = (performance.now() - start - totalPausedMs) / 1000;
      const p = Math.min((elapsed / duration) * 100, 100);
      progressRef.current.style.width = `${p}%`;

      if (!started && p >= 15) {
        onStartRef.current?.();
        started = true;
      }
      if (p >= 100) {
        onCompleteRef.current?.();
      }

      if (p < 100) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [duration]);

  return { progressRef };
}