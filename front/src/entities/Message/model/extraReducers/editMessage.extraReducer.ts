import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { MessagesState } from '../type/messageState.type.ts';
import { messagesAdapter } from '../adapter/messages.adapter.ts';
import { editMessageThunk } from '../thunk/editMessage.thunk.ts';

export const editMessageExtraReducer = (builder: ActionReducerMapBuilder<MessagesState>) => {
  builder.addCase(editMessageThunk.fulfilled, (state, action) => {
    messagesAdapter.upsertOne(state, action.payload);
  });
};
