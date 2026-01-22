import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import { selectAuthUser } from '@/entities/AuthUser';

export const removeFollowerThunk = createAsyncThunk<
  { followerId: string; currentUserId: string },
  { followerId: string },
  ThunkAPI
>(
  'friends/removeFollower',
  async ({ followerId }, { getState, extra, rejectWithValue }) => {
    const state = getState();
    const currentUserId = selectAuthUser(state)?.id

    if (!currentUserId) {
      return rejectWithValue('User not authorized')
    }
    try {
      await extra.services.friends.removeFollower({ userId: followerId });
      return { followerId, currentUserId };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to remove follower');
      return rejectWithValue(errMsg);
    }
  }
);
