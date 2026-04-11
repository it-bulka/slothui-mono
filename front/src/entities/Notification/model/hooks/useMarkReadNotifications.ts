import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { notificationsActions } from '../slice/notifications.slice';
import { useNotificationsService } from '@/shared/libs/services/context/useNotificationsService';

export const useMarkReadNotifications = () => {
  const dispatch = useAppDispatch();
  const notificationsService = useNotificationsService();

  const markReadNotifications = useCallback(async () => {
    dispatch(notificationsActions.markAllAsRead());
    await notificationsService.markAllAsRead();
  }, [dispatch, notificationsService]);

  return { markReadNotifications };
};
