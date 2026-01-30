import {
  useFollowersWithNewOnTopSelect,
  useFollowersStateSelect,
  fetchFollowersThunk, useNewFollowersIdsSelect
} from '@/entities';
import { FriendsList } from '../FriendsList/FriendsList.tsx';
import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { useInfiniteScroll } from '@/shared/hooks';
import { memo } from 'react';
import { useFriendActions } from '@/features/friends';
import { Typography } from '@/shared/ui';

export const FollowersTab = memo(({
  userId,
}: {
  userId: string
}) => {
  const { renderActions } = useFriendActions('followers');

  const followers = useFollowersWithNewOnTopSelect(userId);
  const newFollowerIds = useNewFollowersIdsSelect(userId);

  const { hasMore, isLoading, error, nextCursor } = useFollowersStateSelect(userId);
  const dispatch = useAppDispatch();

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    dispatch(fetchFollowersThunk({ userId, cursor: nextCursor }));
  }, [hasMore, isLoading, dispatch, userId, nextCursor]);

  const { setTrigger } = useInfiniteScroll({
    onLoadMore: loadMore,
    isLoading: Boolean(isLoading || error),
    canLoadMore: hasMore
  });
  return (
    <>
      {(!followers.length && !isLoading && !error)
        && <Typography bold>No any followers yet</Typography>}
      <FriendsList
        friends={followers}
        newFollowerIds={newFollowerIds}
        renderActions={renderActions}
      />

      <div ref={setTrigger} />
    </>
  );
});

FollowersTab.displayName = 'FollowersTab';
