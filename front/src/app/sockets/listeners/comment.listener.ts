import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '../../config';
import { NotificationsMapper } from '@/entities/Notification';

// TODO: confirm the actual socket event name with the backend
const COMMENT_EVENT = 'comment:new';

export const initCommentListeners = (services: ServicesFacade, store: AppStore) => {
  const socket = services.socket.socket;
  if (!socket) return;

  socket.on(COMMENT_EVENT, (e: { id: string; actor: { id: string; username: string; nickname: string; avatarUrl?: string | null }; entityId?: string; entityTitle?: string }) => {
    NotificationsMapper.comment(store.dispatch, e);
  });
};
