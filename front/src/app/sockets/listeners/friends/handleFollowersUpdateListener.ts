import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import type { AppStore } from '@/app/config';
import { authUserActions, friendsActions, selectAuthUserId, resentFriendsActions } from '@/entities';

export function handleFollowersUpdateListener(
  services: IServices,
  store: AppStore
) {
  services.friends.onFollowersUpdate()
    .subscribe(data => {
      const currentUserId = selectAuthUserId(store.getState())
      if(!currentUserId) return

      removeFollowerFromState(store,currentUserId, data.actorId, data.targetId)
    })
}

function removeFollowerFromState(
  store: AppStore,
  currentUserId: string,
  actorId: string,
  targetId: string
) {
  if(resentFriendsActions.isUnfollowRecent(actorId, targetId)) return

  if (actorId === currentUserId) {
    store.dispatch(friendsActions.removeFollower({ userId: currentUserId, followerToRemoveId: targetId }))
    store.dispatch(friendsActions.removeFollowee({ userId: targetId, followeeToRemoveId: currentUserId }))
    store.dispatch(authUserActions.decreaseFollowersCount())
  } else {
    store.dispatch(friendsActions.removeFollower({ userId: targetId, followerToRemoveId: currentUserId }))
    store.dispatch(friendsActions.removeFollowee({ userId: currentUserId, followeeToRemoveId: targetId }))
    store.dispatch(authUserActions.decreaseFolloweesCount())
  }

  resentFriendsActions.markUnfollow(actorId, targetId)
}