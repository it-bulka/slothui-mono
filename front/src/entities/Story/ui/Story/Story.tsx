import { StoryImage } from '../StoryImage/StoryImage';
import { StoryVideo } from '../StoryVideo/StoryVideo';
import type { ReactNode } from 'react';

export interface StoryProps {
  id: string;
  url: string;
  type: 'image' | 'video';
  duration?: number | null;
  isViewed?: boolean;
  isPaused?: boolean;
  onComplete?: () => void
  onStart?: () => void
  onReady?: () => void
}
export const Story = ({ type, url, onComplete, onStart, isPaused, onReady, children }: StoryProps & {  children?: ReactNode }) => {
  const content =
    type === 'image' ? (
      <StoryImage url={url} onComplete={onComplete} onStart={onStart} isPaused={isPaused} onReady={onReady} />
    ) : (
      <StoryVideo url={url} onComplete={onComplete} onStart={onStart} isPaused={isPaused} onReady={onReady} />
    );

  return (
    <div className="h-full w-full relative">
      {content}
      {children}
    </div>
  );
};
