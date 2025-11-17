import { useRef } from 'react';
import { ProgressBar } from '@/shared/ui';
import { useVideoProgress } from '@/shared/hooks/useProgress/useVideoProgress.tsx';

type StoryVideoProps = {
  url: string;
  onComplete?: () => void;
};

export const StoryVideo = ({ url, onComplete }: StoryVideoProps) => {
    const ref = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    useVideoProgress({
      progressRef,
      videoRef: ref,
      onComplete
    })
    return (

      <>
        <ProgressBar
          refProgress={progressRef}
          direction="horizontal"
          position="bottom"
        />
        <video src={url} ref={ref} className="object-cover w-full h-full" autoPlay />
      </>
    )
}

StoryVideo.displayName = 'StoryVideo';
