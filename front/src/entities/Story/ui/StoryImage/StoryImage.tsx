import { ProgressBar } from '@/shared/ui';
import { useProgressOnDuration } from '@/shared/hooks/useProgress/useProgressOnDuration.tsx';

type StoryImageProps = { url: string, onComplete?: () => void };
const IMG_SHOWING_DURATION = 6;

export const StoryImage = ({ url, onComplete }: StoryImageProps) => {
  const { progressRef } = useProgressOnDuration({
    duration: IMG_SHOWING_DURATION,
    onComplete
  })
  return (
    <>
      <ProgressBar
        refProgress={progressRef}
        direction="horizontal"
        position="bottom"
      />

      <img src={url} alt="story" className="object-cover w-full h-full"/>
    </>
  )
};
