import { StoryImage } from '../StoryImage/StoryImage';
import { StoryVideo } from '../StoryVideo/StoryVideo';
import { type StoryProps } from '../../model';
import type { ReactNode } from 'react';

export const Story = ({ type, url, onComplete, children }: StoryProps & {  children?: ReactNode }) => {
  const content =
    type === 'image' ? (
      <StoryImage url={url} onComplete={onComplete} />
    ) : (
      <StoryVideo url={url} onComplete={onComplete} />
    );

  console.log('story RERENDER', url)

  return (
    <div className="h-full w-full relative">
      {content}
      {children}
    </div>
  );
};
