import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChatDTO } from '@/shared/types/chat.types.ts';
import type { ThunkAPI } from '@/shared/config/redux';

export const searchChats = createAsyncThunk<
  ChatDTO[],
  string,
  ThunkAPI
>(
  'chats/search',
  async (searchText, { extra, getState, rejectWithValue }) => {
    const state = getState();
    if (state.chats.allChatsLoaded) {
      return [];
    }
    try {
      const chats = await extra.services.chat.search(searchText);
      return chats;
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch chats');
      return rejectWithValue(errMsg);
    }
  }
);
