import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChatGlobalSearchResult } from '@/shared/types/chat.types.ts';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchGlobalChats = createAsyncThunk<
  ChatGlobalSearchResult,
  string,
  ThunkAPI
>(
  'globalSearch/fetch',
  async (searchText, thunkAPI) => {
    const { signal, extra } = thunkAPI
    const chats = await extra.services.chat.globalSearch(searchText, { signal });
    return chats; // no  slice
  }
);