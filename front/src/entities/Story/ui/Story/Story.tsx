import { StoryImage } from '../StoryImage/StoryImage';
import { StoryVideo } from '../StoryVideo/StoryVideo';
import type { ReactNode } from 'react';

interface StoryProps {
  id: string;
  url: string;
  type: 'image' | 'video';
  duration?: number | null;
  isViewed?: boolean;
  onComplete?: () => void
  onStart?: () => void
}
export const Story = ({ type, url, onComplete, onStart, children }: StoryProps & {  children?: ReactNode }) => {
  const content =
    type === 'image' ? (
      <StoryImage url={url} onComplete={onComplete} onStart={onStart} />
    ) : (
      <StoryVideo url={url} onComplete={onComplete} onStart={onStart} />
    );

  console.log('story RERENDER', url)

  return (
    <div className="h-full w-full relative">
      {content}
      {children}
    </div>
  );
};
