import { useEffect } from 'react';
import type { UserStories } from '@/shared/libs/services';
import { usePrefetch } from '@/shared/hooks';
interface PrefetchProps {
  storiesData: UserStories[]
  currentUserIndex: number
}
export const usePrefetchNextUserStories = ({ currentUserIndex, storiesData }: PrefetchProps) => {
  const prefetch = usePrefetch()
  useEffect(() => {
    const nextUser = storiesData[currentUserIndex + 1]
    if (nextUser) {
      nextUser.stories.forEach(story => {
        prefetch(story.url)
      })
    }
  }, [currentUserIndex, prefetch, storiesData])
}