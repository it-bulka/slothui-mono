import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Chat } from './types/chat.type.ts';

export const chatAdapter = createEntityAdapter<Chat, string>({
  selectId: (chat) => chat.id,
  sortComparer: (a, b) => {
    const aDate = a.lastMessage?.createdAt
    const bDate = b.lastMessage?.createdAt

    if (aDate && bDate) {
      return new Date(bDate).getTime() - new Date(aDate).getTime()
    }
    if (aDate && !bDate) return -1
    if (!aDate && bDate) return 1

    return a.name.localeCompare(b.name)
  }
});