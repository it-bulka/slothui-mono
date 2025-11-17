import { usePrefetch } from '@/shared/hooks';
import { useEffect } from 'react';
import type { StoryDTO } from '@/shared/libs/services';

export const usePrefetchStories = ({ storiesToPrefetch }: { storiesToPrefetch: StoryDTO[] }) => {
  const prefetch = usePrefetch()
  useEffect(() => {
    storiesToPrefetch.forEach(story => {
      prefetch(story.url)
    })
  }, [prefetch, storiesToPrefetch])
}