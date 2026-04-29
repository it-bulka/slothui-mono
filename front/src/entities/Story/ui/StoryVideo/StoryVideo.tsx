import { useRef, useState, useEffect } from 'react';
import { ProgressBar } from '@/shared/ui';
import { useVideoProgress } from '@/shared/hooks/useProgress/useVideoProgress.tsx';

type StoryVideoProps = {
  url: string;
  onComplete?: () => void;
  onStart?: () => void;
  isPaused?: boolean;
  onReady?: () => void;
};

export const StoryVideo = ({ url, onComplete, onStart, isPaused, onReady }: StoryVideoProps) => {
    const ref = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    useVideoProgress({
      progressRef,
      videoRef: ref,
      onComplete,
      onStart
    })

    useEffect(() => {
      if (!ref.current) return;
      if (isPaused) ref.current.pause();
      else ref.current.play().catch(() => {});
    }, [isPaused])
    return (
      <>
        <ProgressBar
          refProgress={progressRef}
          direction="horizontal"
          position="bottom"
        />
        <video
          src={url}
          ref={ref}
          className={`object-cover w-full h-full transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          onLoadedData={() => setLoaded(true)}
          onCanPlay={onReady}
        />
      </>
    )
}

StoryVideo.displayName = 'StoryVideo';
