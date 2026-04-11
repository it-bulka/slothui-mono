import { notificationsAdapter } from '../slice/notifications.adapter';
import type { RootState } from '@/app/config';

const adapterSelectors = notificationsAdapter.getSelectors(
  (state: RootState) => state.notifications,
);

export const selectNotifications = adapterSelectors.selectAll;
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount;
export const selectHasNewNotifications = (state: RootState) =>
  state.notifications.liveIncomingCount > 0;
export const selectHasMore = (state: RootState) => state.notifications.hasMore;
export const selectNextCursor = (state: RootState) => state.notifications.nextCursor;
export const selectIsLoading = (state: RootState) => state.notifications.isLoading;
export const selectLiveIncomingCount = (state: RootState) =>
  state.notifications.liveIncomingCount;
