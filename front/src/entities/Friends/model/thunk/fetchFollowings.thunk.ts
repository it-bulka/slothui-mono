import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PaginatedResponse } from '@/shared/types';
import type { FriendDto } from '@/shared/types';

export const fetchFollowings = createAsyncThunk<
  PaginatedResponse<FriendDto>,
  { cursor?: string, userId: string},
  ThunkAPI
>(
  'friends/fetchFollowings',
  async ({ cursor, userId }, { rejectWithValue, extra }) => {
    try {
      return await extra.services.friends.getFollowings({ cursor, userId });
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch followings');
      return rejectWithValue(errMsg);
    }
  }
);