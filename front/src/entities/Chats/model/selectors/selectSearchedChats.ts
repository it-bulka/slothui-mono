import { createSelector } from '@reduxjs/toolkit';
import { selectChatsEntities } from '../chat.adapter.ts';
import { type Chat } from '../types/chat.type.ts';
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