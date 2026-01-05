import { Stories } from '@/features';
import { useFetchAllStories, useAllGroupedStoriesSelect } from '@/entities';
import { useEffect } from 'react';


export const HomeStories = () => {
  const { items: stories, isLoading } = useAllGroupedStoriesSelect();
  const { fetchAllStories } = useFetchAllStories()

  useEffect(() => {
    fetchAllStories()
  }, [fetchAllStories]);

  if (isLoading || stories.length === 0) return null;

  return <Stories stories={stories} />;
};