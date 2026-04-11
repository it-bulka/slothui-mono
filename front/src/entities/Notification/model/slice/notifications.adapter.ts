import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Notification } from '../type/notification.types';

export const notificationsAdapter = createEntityAdapter<Notification, string>({
  selectId: (n) => n.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});
