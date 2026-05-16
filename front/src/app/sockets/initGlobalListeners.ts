import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import { initMessageBatcher, initFriendsListeners, initLikeListeners, initCommentListeners, initChatsListeners, initContactsListeners } from './listeners';
import type { AppStore } from '../config';

export const initGlobalListeners = (services: ServicesFacade, store: AppStore) => {
  initMessageBatcher(services, store)
  initFriendsListeners(services, store)
  initLikeListeners(services, store)
  initCommentListeners(services, store)
  initChatsListeners(services, store)
  initContactsListeners(services, store)
}
