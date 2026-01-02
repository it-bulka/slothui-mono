import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FriendDto } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const followUserThunk = createAsyncThunk<
  FriendDto,
  { userId: string },
  ThunkAPI
>(
  'friends/followUser',
  async ({ userId }, { rejectWithValue, extra }) => {
    try {
      return await extra.services.friends.followUser({ userId })
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to follow user')
      )
    }
  }
)
