import { type FriendEntity, useAuthUserIdSelector } from '@/entities';
import { DeleteFollowerButton, UnfollowButton, FollowButton } from '../../ui';
import { useAppSelector } from '@/shared/config/redux';

type FriendActionsMode = 'followers' | 'followings' | 'suggestions';

export const useFriendActions = (tab: FriendActionsMode) => {
  const currentUserId = useAuthUserIdSelector();
  const followingIds = useAppSelector(
    state => state.friends.followingsByUser[currentUserId ?? '']?.ids ?? []
  );

  const renderActions = (friend: FriendEntity) => {
    if (tab === 'followers') {
      const isAlreadyFollowing = followingIds.includes(friend.id);
      return (
        <>
          {!isAlreadyFollowing && <FollowButton userId={friend.id} />}
          <DeleteFollowerButton userId={friend.id} />
        </>
      );
    }

    if (tab === 'followings') {
      return <UnfollowButton userId={friend.id} />;
    }

    if (tab === 'suggestions') {
      const isAlreadyFollowing = followingIds.includes(friend.id);
      return !isAlreadyFollowing ? <FollowButton userId={friend.id} /> : null;
    }

    return null;
  };

  return { renderActions };
}
