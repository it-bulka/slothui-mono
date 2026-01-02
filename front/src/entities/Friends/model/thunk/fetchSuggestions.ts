import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PaginatedResponse } from '@/shared/types';
import type { FriendDto } from '@/shared/types';

export const fetchSuggestions = createAsyncThunk<
  PaginatedResponse<FriendDto>,
  { cursor?: string, userId: string },
  ThunkAPI
>(
  'friends/fetchSuggestions',
  async ({ cursor, userId }, { rejectWithValue, extra }) => {
    try {
      return await extra.services.friends.getSuggestions({ cursor, userId });
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch friends suggestions');
      return rejectWithValue(errMsg);
    }
  }
);