import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import { initMessageBatcher, initFriendsListeners, initLikeListeners, initCommentListeners, initChatsListeners } from './listeners';
import type { AppStore } from '../config';

export const initGlobalListeners = (services: IServices, store: AppStore) => {
  initMessageBatcher(services, store)
  initFriendsListeners(services, store)
  initLikeListeners(services, store)
  initCommentListeners(services, store)
  initChatsListeners(services, store)
}
