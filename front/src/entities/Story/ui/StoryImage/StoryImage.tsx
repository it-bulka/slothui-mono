import { useState } from 'react';
import { ProgressBar } from '@/shared/ui';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useProgressOnDuration } from '@/shared/hooks/useProgress/useProgressOnDuration.tsx';

type StoryImageProps = { url: string, onComplete?: () => void, onStart?: () => void, isPaused?: boolean, onReady?: () => void };
const IMG_SHOWING_DURATION = 6;

export const StoryImage = ({ url, onComplete, onStart, isPaused, onReady }: StoryImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const { progressRef } = useProgressOnDuration({
    duration: IMG_SHOWING_DURATION,
    onComplete,
    onStart,
    isPaused,
  })
  return (
    <>
      <ProgressBar
        refProgress={progressRef}
        direction="horizontal"
        position="bottom"
      />

      <div className="relative w-full h-full">
        {!loaded && <Skeleton className="absolute inset-0" />}
        <img
          src={url}
          alt="story"
          className={`object-cover w-full h-full transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          fetchpriority="high"
          onLoad={() => { setLoaded(true); onReady?.(); }}
        />
      </div>
    </>
  )
};
