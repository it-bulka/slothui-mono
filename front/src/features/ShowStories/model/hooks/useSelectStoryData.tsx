import { useMemo, type RefObject } from 'react';
import type { UserStories } from '@/shared/libs/services';

interface SelectStoryDataProps {
  allStories: UserStories[];
  currentUserIndex: number;
  currentStoryIndex: number;
  viewedStories: RefObject<Record<string, string>>;
  nextStory: (storyIndex?: number) => void;
}

export const useSelectStoryData = ({
  allStories,
  currentUserIndex,
  currentStoryIndex,
  viewedStories,
  nextStory,
}: SelectStoryDataProps) => {
  const storyData = useMemo(() => {
    const userStories = allStories[currentUserIndex];
    if (!userStories?.stories?.length) return null;

    const lastSeenStoriesId = viewedStories.current[userStories.userId];
    if (!lastSeenStoriesId) {
      return userStories.stories[currentStoryIndex] ?? null;
    }

    const lastSeenStoryIndex = userStories.stories.findIndex(
      (story) => story.id === lastSeenStoriesId,
    );
    nextStory(lastSeenStoryIndex);
    return null;
  }, [allStories, currentUserIndex, viewedStories, nextStory, currentStoryIndex]);

  const { storyId, userId } = useMemo(() => {
    const userWithStories = allStories[currentUserIndex];
    const story = userWithStories?.stories?.[currentStoryIndex];
    return {
      userId: userWithStories?.userId ?? '',
      storyId: story?.id ?? '',
    };
  }, [allStories, currentStoryIndex, currentUserIndex]);

  return { storyData, storyId, userId };
};
