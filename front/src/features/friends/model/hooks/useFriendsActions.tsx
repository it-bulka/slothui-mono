import { useFollowUser, useRemoveFollower, useRemoveFollowee, type FriendEntity } from '@/entities';
import { Button } from '@/shared/ui';
import { ActionButton } from '@/shared/ui';
import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react'

enum FriendsTab {
  Followers = 0,
  Followings = 1,
}

export const useFriendActions = () => {
  const { removeFollower } = useRemoveFollower()
  const { followUser } = useFollowUser()
  const { removeFollowee } = useRemoveFollowee()

  const renderActions = (friend: FriendEntity, tabIndex: number) => {
    if (tabIndex === FriendsTab.Followers) {
      return (
        <>
          {friend.isFollowing ? (
            <Button
              onClick={() => removeFollowee(friend.id)}
              variant="link"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={() => followUser(friend.id)}
              variant="link"
            >
              Follow
            </Button>
          )}

          <ActionButton
            Icon={DeleteIcon}
            onClick={() => removeFollower(friend.id)}
          />
        </>
      )
    }

    if (tabIndex === FriendsTab.Followings) {
      return (
        <Button
          onClick={() => removeFollowee(friend.id)}
          variant="link"
        >
          Unfollow
        </Button>
      )
    }

    return null
  }

  return { renderActions }
}
