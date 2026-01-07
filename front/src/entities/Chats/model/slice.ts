import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '@/shared/types';
import type { ChatDTO } from '@/shared/types/chat.types.ts';
import { searchChats } from './thunk/searchChats.thunk.ts';
import { createPrivateChatThunk } from './thunk/createPrivateChat.thunk.ts';

export type Chat = ChatDTO & { unreadCount?: number };
interface ChatState {
  activeChatId: string | null
  allChatsLoaded: boolean
  searchResults: string[]
}

const chatAdapter = createEntityAdapter<Chat, string>({
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

const initialState = chatAdapter.getInitialState<ChatState>({
  activeChatId: '1',
  allChatsLoaded: true,
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
    builder.addCase(searchChats.fulfilled, (state, action) => {
      chatAdapter.upsertMany(state, action.payload);
      state.searchResults = action.payload.map(chat => chat.id);
    })
      .addCase(createPrivateChatThunk.fulfilled, (state, action) => {
      chatAdapter.addOne(state, action.payload);
    });
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
