import { Stories } from '@/features';
import { useFetchStoriesByUser, useGroupedStoriesByUserSelect } from '@/entities';
import { useEffect } from 'react';


interface UserStoriesProps {
  userId?: string;
}

export const UserStories = ({ userId }: UserStoriesProps) => {
  const { items: stories, isLoading } = useGroupedStoriesByUserSelect(userId);
  const { fetchStoriesByUser } = useFetchStoriesByUser()

  useEffect(() => {
    if(!userId) return;
    fetchStoriesByUser(userId)
  }, [fetchStoriesByUser, userId]);

  if (isLoading || stories.length === 0) return null;

  return <Stories stories={stories} />;
};