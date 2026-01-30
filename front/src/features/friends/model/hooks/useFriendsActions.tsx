import { type FriendEntity } from '@/entities';
import { DeleteFollowerButton, UnfollowButton, FollowButton } from '../../ui';

export const useFriendActions = (tab: 'followers' | 'followings') => {
  const renderActions = (friend: FriendEntity) => {
    if (tab === 'followers') {
      return (
        <>
          {friend.isFollowee ? (
            <UnfollowButton userId={friend.id} />
          ) : (
            <FollowButton userId={friend.id} />
          )}

         <DeleteFollowerButton userId={friend.id} />
        </>
      )
    }

    if (tab === 'followings') {
      return  <UnfollowButton userId={friend.id} />
    }

    return null
  }

  return { renderActions }
}
