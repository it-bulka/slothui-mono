import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '@/shared/types';
import { chatAdapter } from './chat.adapter.ts';
import type { ChatState, Chat } from './types/chat.type.ts';
import { fetchMyChatsExtraReducer, searchChatsExtraReducer } from './extraReducer';

const initialState = chatAdapter.getInitialState<ChatState>({
  entities: {},
  ids: [],
  activeChatId: null,
  hasMore: true,
  isLoading: false,
  searchResults: [],
});

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatsLoaded: (state, action: PayloadAction<PaginatedResponse<Chat>>) => {
      chatAdapter.addMany(state, action.payload.items);
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
export const {
  selectById: selectChatById,
  selectEntities: selectChatsEntities,
  selectAll: selectSortedChats,
  selectIds: selectChatsIds
} = chatAdapter.getSelectors<{
  chats: typeof initialState
}>((state) => state.chats);
