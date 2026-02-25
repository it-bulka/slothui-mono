import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import type { AppStore } from '../../../config';
import { handleFollowersUpdateListener } from './handleFollowersUpdateListener.ts';
import { handleNewFriendListener } from './handleNewFriendListener.tsx';

export const initFriendsListeners = (
  services: IServices,
  store: AppStore
) => {
  handleNewFriendListener(services, store)
  handleFollowersUpdateListener(services, store)
}



