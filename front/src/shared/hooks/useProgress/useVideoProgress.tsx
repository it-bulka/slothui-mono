import { type RefObject, useEffect, useRef } from 'react';

interface VideoProgressProps {
  videoRef: RefObject<HTMLVideoElement | null>
  progressRef: RefObject<HTMLDivElement | null>
  onComplete?: () => void;
  onStart?: () => void;
}
export const useVideoProgress = ({
  videoRef, progressRef, onComplete, onStart,
}: VideoProgressProps) => {
  const onCompleteRef = useRef(onComplete);
  const onStartRef = useRef(onStart);
  onCompleteRef.current = onComplete;
  onStartRef.current = onStart;

  useEffect(() => {
    if (!videoRef?.current || !progressRef.current) return;
    let started = false;

    const video = videoRef.current;
    const progressEl = progressRef.current;

    const update = () => {
      if (!video.duration) return;
      const progress = (video.currentTime / video.duration) * 100;
      progressEl.style.width = `${progress}%`;

      if (!started && progress >= 15) {
        onStartRef.current?.();
        started = true;
      }
      if (progress >= 100) {
        onCompleteRef.current?.();
      }
    };

    video.addEventListener('timeupdate', update);
    video.addEventListener('loadedmetadata', update);

    return () => {
      video.removeEventListener('timeupdate', update);
      video.removeEventListener('loadedmetadata', update);
    };
  }, [progressRef, videoRef]);
}