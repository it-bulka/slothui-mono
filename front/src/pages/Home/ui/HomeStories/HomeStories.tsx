import { Stories } from '@/features/ShowStories';
import { useFetchAllStories, useGroupedStoriesExcludingUser } from '@/entities/Story';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { useEffect, memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HomeStories = memo(() => {
  const authUser = useAuthUserSelector();
  const { items: stories, isLoading } = useGroupedStoriesExcludingUser(authUser?.id);
  const { fetchAllStories } = useFetchAllStories()

  useEffect(() => {
    fetchAllStories()
  }, [fetchAllStories]);

  if (isLoading) return (
    <div className="flex gap-3 overflow-hidden px-main py-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex flex-col items-center gap-2 shrink-0">
          <Skeleton width={56} height={56} border="50%" />
          <Skeleton width={40} height={10} />
        </div>
      ))}
    </div>
  );

  if (!stories.length) return null;

  return <Stories stories={stories} />;
});

HomeStories.displayName = 'HomeStories';