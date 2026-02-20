import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '@/shared/types';
import { chatAdapter } from './chat.adapter.ts';
import type { Chat } from './types/chat.type.ts';
import { fetchMyChatsExtraReducer, searchChatsExtraReducer } from './extraReducer';
import { initialChatState } from './chat.adapter.ts';

export const chatSlice = createSlice({
  name: 'chats',
  initialState: initialChatState,
  reducers: {
    chatsLoaded: (state, action: PayloadAction<PaginatedResponse<Chat>>) => {
      chatAdapter.addMany(state, action.payload.items);
    },
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      chatAdapter.upsertOne(state, action.payload);
    },
    openChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    closeChat: (state) => {
      state.activeChatId = null;
    }
  },
  extraReducers: (builder) => {
    fetchMyChatsExtraReducer(builder);
    searchChatsExtraReducer(builder);
  }
});

export const { actions: chatsActions, reducer: chatsReducer } = chatSlice;
