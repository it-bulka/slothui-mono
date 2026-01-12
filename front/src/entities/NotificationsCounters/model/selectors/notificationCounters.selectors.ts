import type { RootState } from '@/app/config';

export const selectUnreadMessagesTotal = (state: RootState) =>
  state.notificationsCounters.unreadMessagesTotal;

export const selectUnreadMessagesByChat = (state: RootState) =>
  state.notificationsCounters.unreadMessagesByChat;

export const selectUnreadMessagesForChat = (chatId: string) => (state: RootState) =>
  state.notificationsCounters.unreadMessagesByChat[chatId || ''] ?? 0;

export const selectNewFollowersCount = (state: RootState) =>
  state.notificationsCounters.newFollowers;

export const selectCountersLoading = (state: RootState) =>
  state.notificationsCounters.isLoading;
