import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const removeFolloweeThunk = createAsyncThunk<
  { followeeId: string; currentUserId: string },
  { followeeId: string },
  ThunkAPI
>(
  'friends/removeFollowee',
  async ({ followeeId }, { getState, extra, rejectWithValue }) => {
    const state = getState();
    const user = state.user.data

    if (!user) {
      return rejectWithValue('User not authorized')
    }
    try {
      await extra.services.friends.removeFollowee({ userId: followeeId });
      return { followeeId, currentUserId: user.id };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to remove follower');
      return rejectWithValue(errMsg);
    }
  }
);
