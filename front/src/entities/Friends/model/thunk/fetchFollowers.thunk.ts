import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PaginatedResponse } from '@/shared/types';
import type { FriendDto } from '@/shared/types';

export const fetchFollowers = createAsyncThunk<
  PaginatedResponse<FriendDto> & { followersLastViewedAt: number },
  { cursor?: string | null, userId: string },
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
},
{
  condition: ({ userId }, { getState }) => {
    const feed = getState().friends.followersByUser[userId || ''];
    const lastFetched = feed?.lastFetchedAt;
    if (!lastFetched) return true;

    return Date.now() - lastFetched > 5 * 60 * 1000;
  }
}
);