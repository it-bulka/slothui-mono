import { Stories } from '@/features';
import { useFetchStoriesByUser, useGroupedStoriesByUserSelect } from '@/entities';
import { useEffect } from 'react';
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';

interface UserStoriesProps {
  userId: string;
}

export const UserStories = ({ userId }: UserStoriesProps) => {
  const { items: stories, isLoading } = useGroupedStoriesByUserSelect(userId);
  const { fetchStoriesByUser } = useFetchStoriesByUser();

  useEffect(() => {
    fetchStoriesByUser(userId);
  }, [fetchStoriesByUser, userId]);

  if (isLoading || stories.length === 0) return null;

  return (
    <section>
      <BlockTitle title="Story" withMargin />
      <Stories stories={stories} hideUsername />
    </section>
  );
};
