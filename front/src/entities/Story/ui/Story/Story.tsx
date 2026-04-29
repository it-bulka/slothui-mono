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
}
export const Story = ({ type, url, onComplete, onStart, isPaused, children }: StoryProps & {  children?: ReactNode }) => {
  const content =
    type === 'image' ? (
      <StoryImage url={url} onComplete={onComplete} onStart={onStart} isPaused={isPaused} />
    ) : (
      <StoryVideo url={url} onComplete={onComplete} onStart={onStart} isPaused={isPaused} />
    );

  return (
    <div className="h-full w-full relative">
      {content}
      {children}
    </div>
  );
};
