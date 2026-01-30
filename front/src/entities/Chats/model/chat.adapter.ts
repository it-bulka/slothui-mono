import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Chat, ChatState } from './types/chat.type.ts';

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

export const initialChatState = chatAdapter.getInitialState<ChatState>({
  entities: {},
  ids: [],
  activeChatId: null,
  hasMore: true,
  isLoading: false,
  searchResults: [],
});

export const {
  selectById: selectChatById,
  selectEntities: selectChatsEntities,
  selectAll: selectSortedChats,
  selectIds: selectChatsIds
} = chatAdapter.getSelectors<{
  chats: typeof initialChatState
}>((state) => state.chats);
