import { createSelector } from '@reduxjs/toolkit';
import { selectChatsEntities, type Chat } from '../slice.ts';
import type { RootState } from '@/app/config';

export const selectSearchedChats = createSelector(
  [
    selectChatsEntities,
    (state: RootState) => state.chats.searchResults
  ],

  (chatsEntities, chatsIds) => {
    return chatsIds.reduce((acc, chatId) => {
      const chat = chatsEntities[chatId];
      if (!chat) return acc;

      acc.push(chat);
      return acc;
    }, [] as Chat[]);
  }
);