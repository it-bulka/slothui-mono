import { useEffect, memo } from 'react';
import {
  useAuthUserSelector,
  useGroupedStoriesByUserSelect,
  useFetchStoriesByUser,
  useFlushStoriesViewed,
} from '@/entities';
import { ImageWithFallback } from '@/shared/ui';
import DefaultAvatar from '@/shared/assets/images/default/avatar-default.png';
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
    <div className="w-fit">
      {hasStories ? (
        <div className="flex flex-col items-center gap-2 max-w-[66px] text-gray-g1 text-semibold text-xs">
          <div className="relative">
            <button
              className="rounded-full gradient-border flex items-center justify-center"
              onClick={open}
            >
              <ImageWithFallback
                src={stories[0].avatar}
                fallback={DefaultAvatar}
                alt="My Story"
                className="relative z-2 block w-[66px] rounded-full aspect-square"
              />
            </button>
            <CreateStoryTrigger variant="add-more" />
          </div>
          <p className="text-center">My Story</p>
        </div>
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
