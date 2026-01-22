import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FriendDto } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';
import { selectAuthUser } from '../../../AuthUser';

export const followUserThunk = createAsyncThunk<
  { profile: FriendDto, currentUserId: string },
  { userId: string },
  ThunkAPI
>(
  'friends/followUser',
  async ({ userId }, { rejectWithValue, extra, getState }) => {
    const state = getState();
    const currentUserId = selectAuthUser(state)?.id;
    if(!currentUserId) {
      return rejectWithValue('User not authorised');
    }
    try {
      const profile = await extra.services.friends.followUser({ userId })
      console.log('followUser', profile);
      return { profile, currentUserId };
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to follow user')
      )
    }
  }
)
