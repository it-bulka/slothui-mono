import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '@/app/config';
import { authUserActions, selectAuthUserId } from '@/entities/AuthUser';
import { friendsActions, resentFriendsActions } from '@/entities/Friends';

export function handleFollowersUpdateListener(
  services: ServicesFacade,
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
    store.dispatch(authUserActions.decreaseFolloweesCount())
  } else {
    store.dispatch(friendsActions.removeFollower({ userId: targetId, followerToRemoveId: currentUserId }))
    store.dispatch(friendsActions.removeFollowee({ userId: currentUserId, followeeToRemoveId: targetId }))
    store.dispatch(authUserActions.decreaseFollowersCount())

  }

  resentFriendsActions.markUnfollow(actorId, targetId)
}