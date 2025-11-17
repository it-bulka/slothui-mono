import { useMemo, type RefObject } from 'react';
import type { UserStories } from '@/shared/libs/services';

interface SelectStoryDataProps {
  allStories: UserStories[];
  currentUserIndex: number
  currentStoryIndex: number
  viewedStories: RefObject<Record<string, string>> // Record<userId, storyId>
  nextStory: (storyIndex?: number) => void
}
export const useSelectStoryData = ({
  allStories,
  currentUserIndex,
  currentStoryIndex,
  viewedStories,
  nextStory
}: SelectStoryDataProps) => {
  const storyData = useMemo(() => {
    const userStories = allStories[currentUserIndex]
    const lastSeenStoriesId = viewedStories.current[userStories.userId]

    if (!lastSeenStoriesId) {
      return userStories.stories[currentStoryIndex]
    }
    const lastSeenStoryIndex = userStories.stories.findIndex(story => story.id === lastSeenStoriesId)
    nextStory(lastSeenStoryIndex)
  }, [allStories, currentUserIndex, viewedStories, nextStory, currentStoryIndex])

  const { storyId, userId } = useMemo(() => {
    const userWithStories = allStories[currentUserIndex]

    return {
      userId: userWithStories.userId,
      storyId: userWithStories.stories[currentStoryIndex].id,
    }
  }, [allStories, currentStoryIndex, currentUserIndex])

  return {
    storyData,
    storyId,
    userId,
  }
}