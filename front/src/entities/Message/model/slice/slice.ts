import { createSlice, createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit';
import type { MessageDto } from '../../../../shared/types/message.dto.ts';
import { fetchMessagesByChat } from '../thunk/fetchMessagesByChat.tsx';
import type { PaginatedResponse } from '@/shared/types';
import { sendMessage } from '../thunk/sendMessage.tsx';

interface MessagesState {
  idsByChat: Record<string, string[]>; // масив id по чатах
  sendingByChat: Record<string, boolean>;
  loadingByChat: Record<string, boolean>;
  hasMoreByChat: Record<string, boolean>;
  cursorByChat: Record<string, string | null | undefined>;
}

const messagesAdapter = createEntityAdapter<MessageDto, string>({
  selectId: (msg) => msg.id,
  sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

const initialState = messagesAdapter.getInitialState<MessagesState>({
  idsByChat: {},
  sendingByChat: {},
  loadingByChat: {},
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

    messageReceived: (state, action: PayloadAction<MessageDto>) => {
      const msg = action.payload;
      messagesAdapter.upsertOne(state, msg);

      if (!state.idsByChat[msg.chatId]) state.idsByChat[msg.chatId] = [];
      if (!state.idsByChat[msg.chatId].includes(msg.id)) {
        state.idsByChat[msg.chatId].push(msg.id);
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMessagesByChat.fulfilled,
      (state, action) => {
        const { items: messages, nextCursor, hasMore } = action.payload;
        const { chatId } = action.meta.arg
        messagesAdapter.upsertMany(state, messages);

        if (!state.idsByChat[chatId]) state.idsByChat[chatId] = [];

        state.idsByChat[chatId] = [
          ...messages.map((msg) => msg.id),
          ...state.idsByChat[chatId].filter((id) => !messages.find((m) => m.id === id)),
        ];

        state.hasMoreByChat[chatId] = hasMore;
        state.cursorByChat[chatId] = nextCursor;
        state.loadingByChat[chatId] = false;
      })
      .addCase(
        fetchMessagesByChat.pending,
        (state, action ) => {
          const { chatId } = action.meta.arg
          state.loadingByChat[chatId] = true;
      })
      .addCase(sendMessage.pending, (state, action) => {
        const chatId = action.meta.arg.chatId;
        state.sendingByChat[chatId] = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const chatId = action.meta.arg.chatId;
        state.sendingByChat[chatId] = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const chatId = action.meta.arg.chatId;
        state.sendingByChat[chatId] = false;
      });;

  },
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

