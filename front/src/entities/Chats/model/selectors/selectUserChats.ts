import { createSelector } from '@reduxjs/toolkit';
import { selectChatsEntities, selectChatsIds } from '../chat.adapter.ts';
import type { ChatDTO } from '@/shared/types/chat.types.ts';

export const selectUserChats = createSelector(
  [selectChatsEntities, selectChatsIds],
  (entities, ids) => {
    const result: ChatDTO[] = [];
    for (const id of ids) {
      const chat = entities[id];
      if (chat?.isMember) result.push(chat);
    }
    return result;
  }
);