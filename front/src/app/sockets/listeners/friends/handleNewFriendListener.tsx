import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import type { AppStore } from '@/app/config';
import { NewFriendToast } from '@/shared/ui';
import { authUserActions, friendsActions, selectAuthUserId } from '@/entities';
import { toast } from 'react-toastify'

export function handleNewFriendListener(
  services: IServices,
  store: AppStore
) {
  services.friends.onNewFollower().subscribe(friend => {
    toast.info(<NewFriendToast friend={friend}/>, {
    icon: false,
      autoClose: 5000,
  });

  const currentUserId = selectAuthUserId(store.getState())
  if(!currentUserId) return
  store.dispatch(authUserActions.increaseFollowersCount())
  store.dispatch(friendsActions.resetFriendsStateByUser({ userId: currentUserId}))
})
}