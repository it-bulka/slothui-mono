import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MessageDto } from '../../../../shared/types/message.dto.ts'
import type { PaginatedResponse } from '@/shared/types';
import type { MessagesState } from '../type/messageState.type.ts';
import { messagesAdapter } from '../adapter/messages.adapter.ts';
import {
  fetchMessagesByChatExtraReducer,
  sendMessageExtraReducer,
  updateMessagePollExtraReducer
} from '../extraReducers';

const initialState = messagesAdapter.getInitialState<MessagesState>({
  entities: {},
  ids: [],
  idsByChat: {},
  sendingByChat: {},
  loadingByChat: {},
  errorByChat: {},
  hasMoreByChat: {},
  cursorByChat: {},
});

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messagesLoaded: (
      state,
      action: PayloadAction<PaginatedResponse<MessageDto> & { chatId: string }>
    ) => {
      const { chatId, items: messages, hasMore, nextCursor } = action.payload;

      messagesAdapter.upsertMany(state, messages);

      if (!state.idsByChat[chatId]) state.idsByChat[chatId] = [];

      messages.forEach((msg) => {
        if (!state.idsByChat[chatId].includes(msg.id)) {
          state.idsByChat[chatId].push(msg.id);
        }
      });

      state.hasMoreByChat[chatId] = hasMore;
      state.cursorByChat[chatId] = nextCursor;
      state.loadingByChat[chatId] = false;
    },

    addMessage: (state, action: PayloadAction<{chatId: string, message: MessageDto}>) => {
      const { chatId, message } = action.payload;
      messagesAdapter.upsertOne(state, message);

      if (!state.idsByChat[chatId]) {
        state.idsByChat[chatId] = [message.id]
        return;
      }

      if (!state.idsByChat[chatId].includes(message.id)) {
        state.idsByChat[chatId] = [message.id, ...state.idsByChat[chatId]];
      }
    },

    setLoading: (state, action: PayloadAction<{ chatId: string; loading: boolean }>) => {
      state.loadingByChat[action.payload.chatId] = action.payload.loading;
    },

    clearMessagesByChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const ids = state.idsByChat[chatId] || [];
      ids.forEach((id) => messagesAdapter.removeOne(state, id));
      delete state.idsByChat[chatId];
      delete state.loadingByChat[chatId];
      delete state.hasMoreByChat[chatId];
    }
  },
  extraReducers: (builder) => {
    fetchMessagesByChatExtraReducer(builder)
    sendMessageExtraReducer(builder)
    updateMessagePollExtraReducer(builder)
  }
});

export const messagesAction = messageSlice.actions;

export const messageReducer = messageSlice.reducer;

// SELECTORS
export const {
  selectById: selectMessageById,
  selectEntities: selectMessageEntities,
  selectAll: selectAllMessages,
} = messagesAdapter.getSelectors<{
  message: typeof initialState;
}>((state) => state.message);

