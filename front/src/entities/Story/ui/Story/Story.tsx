import { StoryImage } from '../StoryImage/StoryImage';
import { StoryVideo } from '../StoryVideo/StoryVideo';
import { type StoryProps } from '../../model';
import type { PropsWithChildren } from 'react';

export const Story = ({ type, url, onComplete }: PropsWithChildren<StoryProps>) => {
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
    </div>
  );
};
