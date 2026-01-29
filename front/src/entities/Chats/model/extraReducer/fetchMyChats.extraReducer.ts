import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { ChatState } from '../types/chat.type.ts';
import { fetchMyChatsThunk } from '../thunk/fetchMyChats.thunk.ts';
import { chatAdapter } from '../chat.adapter.ts';

export const fetchMyChatsExtraReducer = (builder: ActionReducerMapBuilder<ChatState>) => {
  builder
    .addCase(fetchMyChatsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchMyChatsThunk.fulfilled, (state, action) => {
      chatAdapter.upsertMany(state, action.payload.items);

      state.isLoading = false;
      state.hasMore = action.payload.hasMore;
      state.nextCursor = action.payload.nextCursor;
    })
    .addCase(fetchMyChatsThunk.rejected, (state, action) => {

      state.isLoading = false;
      state.error = action.payload
    })
}
