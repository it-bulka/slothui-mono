import { Stories } from '@/features';
import { useFetchAllStories, useAllGroupedStoriesSelect } from '@/entities';
import { useEffect, memo } from 'react';


export const HomeStories = memo(() => {
  const { items: stories, isLoading } = useAllGroupedStoriesSelect();
  const { fetchAllStories } = useFetchAllStories()

  useEffect(() => {
    fetchAllStories()
  }, [fetchAllStories]);

  if (isLoading || stories.length === 0) return null;

  return <Stories stories={stories} />;
});

HomeStories.displayName = 'HomeStories';