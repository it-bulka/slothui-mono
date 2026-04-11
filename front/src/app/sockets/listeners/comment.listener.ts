import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import type { AppStore } from '../../config';
import { NotificationsMapper } from '@/entities/Notification';

// TODO: confirm the actual socket event name with the backend
const COMMENT_EVENT = 'comment:new';

export const initCommentListeners = (services: IServices, store: AppStore) => {
  const socket = services.socket.socket;
  if (!socket) return;

  socket.on(COMMENT_EVENT, (e: { id: string; actor: { id: string; username: string; nickname: string; avatarUrl?: string | null }; entityId?: string; entityTitle?: string }) => {
    NotificationsMapper.comment(store.dispatch, e);
  });
};
