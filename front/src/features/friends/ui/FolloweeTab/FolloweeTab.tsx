import {
  useFolloweeStateSelect,
  useFollowingsSelector,
  fetchFollowingsThunk
} from '@/entities';
import { FriendsList } from '../FriendsList/FriendsList.tsx';
import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { useInfiniteScroll } from '@/shared/hooks';
import { memo } from 'react';
import { useFriendActions } from '@/features/friends';
import { Typography } from '@/shared/ui';

export const FolloweeTab = memo(({
  userId
}: {
  userId: string,
}) => {
  const { renderActions } = useFriendActions('followings');

  const followings = useFollowingsSelector(userId);

  const { hasMore, isLoading, error, nextCursor } = useFolloweeStateSelect(userId);
  const dispatch = useAppDispatch();

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    dispatch(fetchFollowingsThunk({ userId, cursor: nextCursor }));
  }, [hasMore, isLoading, dispatch, userId, nextCursor]);

  const { setTrigger } = useInfiniteScroll({
    onLoadMore: loadMore,
    isLoading: Boolean(isLoading || error),
    canLoadMore: hasMore
  });

  return (
    <>
      {(!followings.length && !isLoading && !error)
        && <Typography bold>No any followee yet</Typography>}

      <FriendsList
        friends={followings}
        newFollowerIds={[]}
        renderActions={renderActions}
      />

      <div ref={setTrigger} />
    </>
  );
});

FolloweeTab.displayName = 'FolloweeTab';
