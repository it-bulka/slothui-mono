import { createSelector } from '@reduxjs/toolkit';
import { selectChatsIds, selectChatsEntities } from '../slice.ts';
import type { RootState } from '@/app/config';

export const selectTotalUnreadForUser = createSelector(
    [
      selectChatsIds,
      selectChatsEntities,
      (_state: RootState, userId?: string) => userId
    ],
    (ids, entities, userId) => {
      let total = 0;
      if(!userId) return total

      for (const id of ids) {
        const chat = entities[id];
        if (!chat) continue;

        if (!chat.members.includes(userId)) continue;

        if(chat.unreadCount) {
          total += +chat.unreadCount;
        }
      }

      return total;
    }
  );
