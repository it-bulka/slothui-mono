import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const removeFollowerThunk = createAsyncThunk<
  { followerId: string; currentUserId: string },
  { followerId: string },
  ThunkAPI
>(
  'friends/removeFollower',
  async ({ followerId }, { getState, extra, rejectWithValue }) => {
    const state = getState();
    const user = state.user.data

    if (!user) {
      return rejectWithValue('User not authorized')
    }
    try {
      await extra.services.friends.removeFollower({ userId: followerId });
      return { followerId, currentUserId: user.id };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to remove follower');
      return rejectWithValue(errMsg);
    }
  }
);
