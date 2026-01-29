import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChatDTO } from '@/shared/types/chat.types.ts';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PaginatedResponse } from '@/shared/types';

export const fetchMyChatsThunk = createAsyncThunk<
  PaginatedResponse<ChatDTO>,
  { cursor?: string | null },
  ThunkAPI
>(
  'chats/fetchMyChats',
  async (arg, { extra, rejectWithValue }) => {
    try {
      return await extra.services.chat.listChats({ cursor: arg.cursor });
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch chats');
      return rejectWithValue(errMsg);
    }
  }
);
