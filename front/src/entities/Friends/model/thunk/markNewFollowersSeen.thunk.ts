import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const markNewFollowersSeenThunk = createAsyncThunk<
  { followersLastSeenAt: number, userId: string }, // followersLastSeenAt
  void,
  ThunkAPI
>(
  'friends/markNewFollowersSeen',
  async (_arg, { getState, extra, rejectWithValue }) => {
    const userId = getState().user?.data?.id
    if (!userId) {
      return rejectWithValue('User not authorized')
    }
    try {
      const followersLastSeenAt = await extra.services.friends.markFollowersSeen();
      return { followersLastSeenAt, userId };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to mark followers seen');
      return rejectWithValue(errMsg);
    }
  }
);
