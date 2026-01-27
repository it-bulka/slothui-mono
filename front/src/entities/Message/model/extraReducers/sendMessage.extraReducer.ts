import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { MessagesState } from '../type/messageState.type.ts';
import { sendMessage } from '@/entities/Message/model';

export const sendMessageExtraReducer = (builder: ActionReducerMapBuilder<MessagesState>) => {
  builder.addCase(sendMessage.pending, (state, action) => {
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
    });
}
