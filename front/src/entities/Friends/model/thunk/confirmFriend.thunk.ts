import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FriendDto } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const confirmFriendThunk = createAsyncThunk<
  FriendDto,
  { userId: string },
  ThunkAPI
>(
  'friends/confirmFriend',
  async ({ userId }, { rejectWithValue, extra }) => {
    try {
      return await extra.services.friends.confirmFriend({ userId })
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to confirm friend')
      )
    }
  }
)
