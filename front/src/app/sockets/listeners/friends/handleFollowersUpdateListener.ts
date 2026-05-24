import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '@/app/config';
import { authUserActions, selectAuthUserId } from '@/entities/AuthUser';
import { friendsActions, resentFriendsActions } from '@/entities/Friends';
import { notificationsCountersActions } from '@/entities/NotificationsCounters';

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
    // I unfollowed targetId: remove targetId from MY followings, remove ME from targetId's followers
    store.dispatch(friendsActions.removeFollowee({ userId: currentUserId, followeeToRemoveId: targetId }))
    store.dispatch(friendsActions.removeFollower({ userId: targetId, followerToRemoveId: currentUserId }))
    store.dispatch(authUserActions.decreaseFolloweesCount())
  } else {
    // actorId unfollowed targetId; only update state when I am the target
    if (currentUserId !== targetId) return
    // Remove actorId from MY followers, remove ME from actorId's followings
    store.dispatch(friendsActions.removeFollower({ userId: currentUserId, followerToRemoveId: actorId }))
    store.dispatch(friendsActions.removeFollowee({ userId: actorId, followeeToRemoveId: currentUserId }))
    store.dispatch(authUserActions.decreaseFollowersCount())
    store.dispatch(notificationsCountersActions.decrementNewFollowers())
  }

  resentFriendsActions.markUnfollow(actorId, targetId)
}