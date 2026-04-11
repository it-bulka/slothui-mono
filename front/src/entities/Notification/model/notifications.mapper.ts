import { notificationsActions } from './slice/notifications.slice';
import type { AppDispatch } from '@/shared/config/redux';
import type { Notification } from './type/notification.types';
import type { UserShort } from '@/shared/types';

interface LikeEvent {
  id: string;
  actor: UserShort;
  entityId?: string;
  entityTitle?: string;
}

interface CommentEvent {
  id: string;
  actor: UserShort;
  entityId?: string;
  entityTitle?: string;
}

interface FollowEvent {
  id: string;
  actor: UserShort;
}

export class NotificationsMapper {
  static like(dispatch: AppDispatch, e: LikeEvent) {
    const n: Notification = {
      id: e.id,
      type: 'like',
      actor: e.actor,
      entityId: e.entityId,
      entityTitle: e.entityTitle,
      createdAt: new Date().toISOString(),
      read: false,
    };
    dispatch(notificationsActions.incomingNotification(n));
  }

  static comment(dispatch: AppDispatch, e: CommentEvent) {
    const n: Notification = {
      id: e.id,
      type: 'comment',
      actor: e.actor,
      entityId: e.entityId,
      entityTitle: e.entityTitle,
      createdAt: new Date().toISOString(),
      read: false,
    };
    dispatch(notificationsActions.incomingNotification(n));
  }

  static follow(dispatch: AppDispatch, e: FollowEvent) {
    const n: Notification = {
      id: e.id,
      type: 'follow',
      actor: e.actor,
      createdAt: new Date().toISOString(),
      read: false,
    };
    dispatch(notificationsActions.incomingNotification(n));
  }
}
