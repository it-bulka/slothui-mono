import { createSelector } from '@reduxjs/toolkit';
import { selectSortedChats } from '@/entities';
import type { RootState } from '@/app/config';

export const selectUserChats = createSelector(
    selectSortedChats,
    (_state: RootState, userId: string) => userId,

    (chats, userId) => chats.filter(chat => chat.members.includes(userId))
  );