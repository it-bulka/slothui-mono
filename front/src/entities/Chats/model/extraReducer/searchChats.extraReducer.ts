import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { ChatState } from '../types/chat.type.ts';
import { chatAdapter } from '../chat.adapter.ts';
import { createPrivateChatThunk, searchChatsThunk } from '@/entities';

export const searchChatsExtraReducer = (builder: ActionReducerMapBuilder<ChatState>) => {
  builder.addCase(searchChatsThunk.fulfilled, (state, action) => {
    chatAdapter.upsertMany(state, action.payload);
    state.searchResults = action.payload.map(chat => chat.id);
  })
    .addCase(createPrivateChatThunk.fulfilled, (state, action) => {
      chatAdapter.addOne(state, action.payload);
    });
}
