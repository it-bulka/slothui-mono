import { useCallback, type SetStateAction, type Dispatch } from 'react';
import type { UserStories } from '@/shared/libs/services';
interface SwitchStoriesProps {
  currentStoryIndex: number
  currentUserIndex: number
  setCurrentStoryIndex: Dispatch<SetStateAction<number>>
  setCurrentUserIndex: Dispatch<SetStateAction<number>>
  onStoriesEnd?: () => void
  allStories: UserStories[]
}
export const useSwitchStories = ({
  currentStoryIndex,
  currentUserIndex,
  setCurrentStoryIndex,
  setCurrentUserIndex,
  onStoriesEnd,
  allStories
}: SwitchStoriesProps) => {
  const prevStory = useCallback(() => {
    // More stories before in current user
    if(currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      return
    }

    // Go to previous user → last story of that user
    if(currentUserIndex > 0) {
      const prevUser = allStories[currentUserIndex - 1]
      const lastIndex = Math.max(0, (prevUser?.stories?.length ?? 1) - 1)
      setCurrentStoryIndex(lastIndex)
      setCurrentUserIndex(prev => prev - 1)
      return;
    }

    // At the very beginning — do nothing
  }, [allStories, currentStoryIndex, currentUserIndex, setCurrentStoryIndex, setCurrentUserIndex])
  
  const nextStory = useCallback((storyIndex?: number) => {
    const currentUserStory = allStories[currentUserIndex]
    const index = storyIndex ?? currentStoryIndex
    const nextStoryIndex = index + 1

    // More stories for the same user
    if(currentUserStory.stories.length > nextStoryIndex) {
      setCurrentStoryIndex(nextStoryIndex)
      return
    }

    // Move to next user
    if(currentUserIndex + 1 < allStories.length) {
      setCurrentStoryIndex(0)
      setCurrentUserIndex(prev => prev + 1)
      return;
    }

    onStoriesEnd?.()
  }, [allStories, currentUserIndex, currentStoryIndex, onStoriesEnd, setCurrentStoryIndex, setCurrentUserIndex])
  
  
  return {
    prevStory,
    nextStory
  }
}