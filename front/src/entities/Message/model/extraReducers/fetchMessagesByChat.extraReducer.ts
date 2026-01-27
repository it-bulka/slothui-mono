import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { MessagesState } from '../type/messageState.type.ts';
import { addUniqueIds } from '@/shared/libs';
import { fetchMessagesByChatThunk } from '../thunk/fetchMessagesByChat.tsx';
import { messagesAdapter } from '../adapter/messages.adapter.ts';

export const fetchMessagesByChatExtraReducer = (builder: ActionReducerMapBuilder<MessagesState>) => {
  builder
    .addCase(fetchMessagesByChatThunk.pending, (state, action) => {
      const chatId = action.meta.arg.chatId;

      state.idsByChat[chatId] ??= []
      state.loadingByChat[chatId] = true
      delete state.errorByChat[chatId]
    })
    .addCase(fetchMessagesByChatThunk.fulfilled, (state, action) => {
    messagesAdapter.upsertMany(state, action.payload.items)

    const chatId = action.meta.arg.chatId;

    state.idsByChat[chatId] = addUniqueIds(state.idsByChat[chatId], action.payload.items)
    state.loadingByChat[chatId] = false
    state.hasMoreByChat[chatId] = action.payload.hasMore
    state.cursorByChat[chatId] = action.payload.nextCursor
  })
    .addCase(fetchMessagesByChatThunk.rejected, (state, action) => {
      const chatId = action.meta.arg.chatId;

      state.loadingByChat[chatId] = false
      state.hasMoreByChat[chatId] = false
      state.errorByChat[chatId] = action.payload
    })
}
