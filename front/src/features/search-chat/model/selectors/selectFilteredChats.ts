import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import { selectSortedChats } from '@/entities';

export const selectFilteredChats = (search: string) =>
  createSelector(
    (state: RootState) => selectSortedChats(state),
    (chats) => chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase()))
  );