import { Stories } from '@/features';
import { useFetchAllStories, useGroupedStoriesExcludingUser, useAuthUserSelector } from '@/entities';
import { useEffect, memo } from 'react';


export const HomeStories = memo(() => {
  const authUser = useAuthUserSelector();
  const { items: stories, isLoading } = useGroupedStoriesExcludingUser(authUser?.id);
  const { fetchAllStories } = useFetchAllStories()

  useEffect(() => {
    fetchAllStories()
  }, [fetchAllStories]);

  if (isLoading || stories.length === 0) return null;

  return <Stories stories={stories} />;
});

HomeStories.displayName = 'HomeStories';