import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import { selectAuthUser } from '../../../AuthUser';

export const unfollowThunk = createAsyncThunk<
  { followeeId: string; currentUserId: string },
  { followeeId: string },
  ThunkAPI
>(
  'friends/unfollow',
  async ({ followeeId }, { getState, extra, rejectWithValue }) => {
    const state = getState();
    const user = selectAuthUser(state)

    if (!user) {
      return rejectWithValue('User not authorized')
    }
    try {
      await extra.services.friends.unfollow({ userId: followeeId });
      return { followeeId, currentUserId: user.id };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to remove follower');
      return rejectWithValue(errMsg);
    }
  }
);
