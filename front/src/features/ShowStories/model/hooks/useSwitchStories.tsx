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
    // CHANGE STORY; the same USER
    if(currentStoryIndex > 0) {
      setCurrentStoryIndex((prev: number) => prev - 1)
      return
    }

    // CHANGE STORY & USER
    if(currentStoryIndex === 0) {
      if(currentUserIndex === 0) {
        onStoriesEnd?.()
        return;
      }

      setCurrentStoryIndex(0)
      setCurrentUserIndex(prev => prev - 1)
      return;
    }
  }, [currentStoryIndex, currentUserIndex, onStoriesEnd, setCurrentStoryIndex, setCurrentUserIndex])
  
  const nextStory = useCallback((storyIndex?: number) => {
    const currentUserStory = allStories[currentUserIndex]
    const index = storyIndex || currentStoryIndex
    const amountOfSeenStories = index + 1

    // CHANGE STORY; the same USER
    if(currentUserStory.stories.length > amountOfSeenStories) {
      setCurrentStoryIndex(prev => prev + 1)
      return
    }

    // CHANGE STORY & USER
    if(allStories.length > amountOfSeenStories) {
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