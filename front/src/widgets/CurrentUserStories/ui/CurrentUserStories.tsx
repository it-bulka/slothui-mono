import { useEffect, memo } from 'react';
import {
  useAuthUserSelector,
  useGroupedStoriesByUserSelect,
  useFetchStoriesByUser,
  useFlushStoriesViewed,
  StoryAvatar,
} from '@/entities';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { StoryModal } from '@/features/ShowStories';
import { CreateStoryTrigger } from '@/features/CreateStory';

export const CurrentUserStories = memo(() => {
  const authUser = useAuthUserSelector();
  const { items: stories, isLoading } = useGroupedStoriesByUserSelect(authUser?.id);
  const { fetchStoriesByUser } = useFetchStoriesByUser();
  const { isOpen, open, close } = useModalControl(false);
  const { flushStoriesViewed } = useFlushStoriesViewed();

  useEffect(() => {
    if (authUser?.id) fetchStoriesByUser(authUser.id);
  }, [authUser?.id, fetchStoriesByUser]);

  const hasStories = !isLoading && stories.length > 0;
  const avatarSrc = authUser?.avatarUrl ?? undefined;

  return (
    <div className="relative w-fit">
      {hasStories ? (
        <>
          <StoryAvatar
            avatarSrc={stories[0].avatar}
            username="My Story"
            onClick={open}
          />
          <CreateStoryTrigger variant="add-more" />
        </>
      ) : (
        <CreateStoryTrigger
          variant="add-first"
          avatarSrc={avatarSrc}
        />
      )}

      {hasStories && (
        <StoryModal
          isOpen={isOpen}
          onClose={() => {
            close();
            flushStoriesViewed();
          }}
          allStories={stories}
          startUserIndex={0}
        />
      )}
    </div>
  );
});

CurrentUserStories.displayName = 'CurrentUserStories';
