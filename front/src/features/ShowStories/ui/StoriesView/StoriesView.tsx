import { useCallback, useRef, useState, type MouseEvent, memo } from 'react';
import type { UserStories } from '@/shared/libs/services';
import { Story } from '@/entities';
import { Avatar, CloseButton } from '@/shared/ui';
import { StoryProgress } from '../StoryProgress/StoryProgress.tsx';
import { CommentStory } from '@/features/CommentStory';
import { Link } from 'react-router';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import {
  useSwitchStories,
  useSelectStoryData,
  useClickStory,
  usePressEvent,
  usePrefetchNextUserStories
} from '../../model';
import { useMarkStoriesViewedLocally } from '@/entities';

interface StoriesView {
  onStoriesEnd?: () => void;
  allStories: UserStories[]
  startUserIndex?: number | null;
  onClose: () => void;
}
export const StoriesView = memo(({ onStoriesEnd, allStories, onClose, startUserIndex }: StoriesView) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0)
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(startUserIndex || 0)
  const viewedStories = useRef<Record<string, string>>({}) // Record<userId, storyId>
  const { markStoryViewedLocally } = useMarkStoriesViewedLocally()
  const { prevStory, nextStory } = useSwitchStories({
    setCurrentStoryIndex,
    setCurrentUserIndex,
    allStories,
    currentStoryIndex,
    currentUserIndex,
    onStoriesEnd
  })

  const { storyData, storyId, userId } = useSelectStoryData({
    nextStory,
    currentStoryIndex,
    currentUserIndex,
    viewedStories,
    allStories
  })

  usePrefetchNextUserStories({
    storiesData: allStories,
    currentUserIndex
  })

  const stopStory = () => {}

  const { isPress, handleMouseDown, handleMouseUp } = usePressEvent({
    onPress: stopStory,
  });

  const { handleClick } = useClickStory({
    onLeftClick: prevStory,
    onRightClick: nextStory,
    isPress
  });

  const handleClose = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.()
  }, [onClose])

  return (
    <div
      className="relative h-[80vh] max-w-[80vh] aspect-[3/4] mx-auto overflow-hidden rounded-2xl"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {storyData &&  (
        <Story
          id={storyData.id}
          key={storyData.id}
          url={storyData.url}
          type={storyData.type}
          duration={storyData.duration}
          onStart={() => {
            markStoryViewedLocally(storyData.id)
          }}
          onComplete={() => {
            console.log('Story complete')
            //nextStory()
          }}
        >
          <CommentStory storyId={storyId} userId={userId} />
        </Story>
      )}

      <CloseButton onClick={handleClose} className="absolute top-2 right-2 z-10"/>
      <Link to={getUserPage(userId)} className="absolute top-2 left-2 z-10">
        <Avatar src={allStories[currentUserIndex].avatar} />
      </Link>
      <StoryProgress
        amount={allStories[currentUserIndex].stories.length}
        activeIndex={currentStoryIndex}
      />
    </div>
  )
})

StoriesView.displayName = 'StoriesView'