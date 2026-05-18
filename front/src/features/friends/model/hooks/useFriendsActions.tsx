import { type FriendEntity } from '@/entities/Friends'
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { DeleteFollowerButton, UnfollowButton, FollowButton } from '../../ui';
import { useAppSelector } from '@/shared/config/redux';

type FriendActionsMode = 'followers' | 'followings' | 'suggestions';

const EMPTY_IDS: string[] = [];

export const useFriendActions = (tab: FriendActionsMode, isOwner: boolean = true) => {
  const currentUserId = useAuthUserIdSelector();
  const followingIds = useAppSelector(
    state => state.friends.followingsByUser[currentUserId ?? '']?.ids ?? EMPTY_IDS
  );

  const renderActions = (friend: FriendEntity) => {
    if (friend.id === currentUserId) return null;

    if (!isOwner) {
      const isAlreadyFollowing = followingIds.includes(friend.id);
      return isAlreadyFollowing
        ? <UnfollowButton userId={friend.id} />
        : <FollowButton userId={friend.id} />;
    }

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
