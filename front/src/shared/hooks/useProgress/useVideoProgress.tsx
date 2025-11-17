import { type RefObject, useEffect } from 'react';

interface VideoProgressProps {
  videoRef: RefObject<HTMLVideoElement | null>
  progressRef: RefObject<HTMLDivElement | null>
  onComplete?: () => void;
}
export const useVideoProgress = ({
  videoRef, progressRef, onComplete
}: VideoProgressProps) => {
  useEffect(() => {
    if (!videoRef?.current || !progressRef.current) return;

    const video = videoRef.current;
    const progressEl = progressRef.current;

    const update = () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressEl.style.width = `${progress}%`;

      if(progress >= 100) {
        onComplete?.();
      }
    };

    video.addEventListener('timeupdate', update);
    video.addEventListener('loadedmetadata', update); // if duration is unknown

    return () => {
      video.removeEventListener('timeupdate', update);
      video.removeEventListener('loadedmetadata', update);
    };
  }, [progressRef, videoRef, onComplete]);
}