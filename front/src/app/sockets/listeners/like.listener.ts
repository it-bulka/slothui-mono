import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '../../config';
import { NotificationsMapper } from '@/entities/Notification';

// TODO: confirm the actual socket event name with the backend
const LIKE_EVENT = 'like:new';

export const initLikeListeners = (services: ServicesFacade, store: AppStore) => {
  const socket = services.socket.socket;
  if (!socket) return;

  socket.on(LIKE_EVENT, (e: { id: string; actor: { id: string; username: string; nickname: string; avatarUrl?: string | null }; entityId?: string; entityTitle?: string }) => {
    NotificationsMapper.like(store.dispatch, e);
  });
};
