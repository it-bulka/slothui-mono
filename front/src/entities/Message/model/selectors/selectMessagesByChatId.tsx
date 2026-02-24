import type { RootState } from '@/app/config';
import { createSelector } from '@reduxjs/toolkit';

export const selectMessagesByChatId = createSelector(
  [
    (state: RootState) => state.messages.idsByChat,
    (state: RootState) => state.messages.entities,
    (_: RootState, chatId?: string | null) => chatId,
  ],
  (idsByChat, entities, chatId) => {
    if (!chatId) return [];

    const ids = idsByChat[chatId] || [];
    return ids.map(id => entities[id]);
  }
);

