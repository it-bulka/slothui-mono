import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '@/shared/types';

interface Chat {
  id: string;
  name: string;
  lastMessageId: string;
  lastMessageCreatedAt: string;
}

interface ChatState {
  activeChatId: string | null
}

const chatAdapter = createEntityAdapter<Chat, string>({
  selectId: (chat) => chat.id,
  sortComparer: (a, b) => new Date(a.lastMessageCreatedAt).getTime() - new Date(b.lastMessageCreatedAt).getTime(),
});

const initialState = chatAdapter.getInitialState<ChatState>({
  activeChatId: '1'
});

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatLoaded: (state, action: PayloadAction<PaginatedResponse<Chat>>) => {
      chatAdapter.addMany(state, action.payload.items);
    },
    openChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    closeChat: (state) => {
      state.activeChatId = null;
    }
  }
});

export const { actions: chatsActions, reducer: chatsReducer } = chatSlice;
