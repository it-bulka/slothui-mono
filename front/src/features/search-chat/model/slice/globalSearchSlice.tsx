import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChatDTO } from '@/shared/types/chat.types.ts';
import { fetchGlobalChats } from '../thunk/fetchGlobalChats.tsx';

interface GlobalSearchState {
  results: ChatDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: GlobalSearchState = {
  results: [],
  loading: false,
  error: null,
};

const globalSearchSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalChats.fulfilled, (state, action: PayloadAction<ChatDTO[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchGlobalChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch chats';
      });
  },
});

export const globalSearchReducer = globalSearchSlice.reducer;
