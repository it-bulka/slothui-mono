import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '../../config';
import { NotificationsMapper } from '@/entities/Notification';
import { NotificationToast } from '@/shared/ui/NotificationToast/NotificationToast';
import { PostSocketEvents } from '@/shared/libs/services/postsService/posts.events.ts';
import { toast } from 'react-toastify';

export const initLikeListeners = (services: ServicesFacade, store: AppStore) => {
  const socket = services.socket.socket;
  if (!socket) return;

  socket.on(PostSocketEvents.LIKE_NEW, (e: { id: string; actor: { id: string; username: string; nickname: string; avatarUrl?: string | null }; entityId?: string; entityTitle?: string }) => {
    NotificationsMapper.like(store.dispatch, e);
    toast.info(<NotificationToast type="like" actor={e.actor} entityId={e.entityId} />, {
      icon: false,
      autoClose: 5000,
    });
  });
};
