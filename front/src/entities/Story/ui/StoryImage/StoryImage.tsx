import { useState } from 'react';
import { ProgressBar } from '@/shared/ui';
import { useProgressOnDuration } from '@/shared/hooks/useProgress/useProgressOnDuration.tsx';

type StoryImageProps = { url: string, onComplete?: () => void, onStart?: () => void, isPaused?: boolean };
const IMG_SHOWING_DURATION = 6;

export const StoryImage = ({ url, onComplete, onStart, isPaused }: StoryImageProps) => {
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

      <img
        src={url}
        alt="story"
        className={`object-cover w-full h-full transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
};
