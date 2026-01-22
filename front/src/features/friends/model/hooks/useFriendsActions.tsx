import { type FriendEntity } from '@/entities';
import { DeleteFollowerButton, UnfollowButton, FollowButton } from '../../ui';

enum FriendsTab {
  Followers = 0,
  Followings = 1,
}

export const useFriendActions = () => {
  const renderActions = (friend: FriendEntity, tabIndex: number) => {
    if (tabIndex === FriendsTab.Followers) {
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

    if (tabIndex === FriendsTab.Followings) {
      return  <UnfollowButton userId={friend.id} />
    }

    return null
  }

  return { renderActions }
}
