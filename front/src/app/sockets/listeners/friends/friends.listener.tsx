import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '../../../config';
import { handleFollowersUpdateListener } from './handleFollowersUpdateListener.ts';
import { handleNewFriendListener } from './handleNewFriendListener.tsx';

export const initFriendsListeners = (
  services: ServicesFacade,
  store: AppStore
) => {
  handleNewFriendListener(services, store)
  handleFollowersUpdateListener(services, store)
}



