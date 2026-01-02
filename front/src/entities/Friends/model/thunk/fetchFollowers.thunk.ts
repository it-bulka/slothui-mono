import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PaginatedResponse } from '@/shared/types';
import type { FriendDto } from '@/shared/types';

export const fetchFollowers = createAsyncThunk<
  PaginatedResponse<FriendDto>,
  { cursor?: string, userId: string },
  ThunkAPI
>(
  'friends/fetchFollowers',
  async ({ cursor, userId }, { rejectWithValue, extra }) => {
  try {
    return await extra.services.friends.getFollowers({ cursor, userId });
  } catch (e) {
    const errMsg = extra.extractErrorMessage(e, 'Failed to fetch followers');
    return rejectWithValue(errMsg);
  }
});