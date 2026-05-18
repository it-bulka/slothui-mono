import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FriendDto } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';
import { selectAuthUser } from '../../../AuthUser';
import type { UserState } from '../../../AuthUser/model/types';
import { resentFriendsActions } from '@/entities/Friends';

export const followUserThunk = createAsyncThunk<
  { profile: FriendDto; currentUserId: string; currentUserProfile: UserState | null },
  { userId: string },
  ThunkAPI
>(
  'friends/followUser',
  async ({ userId }, { rejectWithValue, extra, getState }) => {
    const state = getState();
    const currentUser = selectAuthUser(state);

    if(!currentUser?.id) return rejectWithValue('User not authorised');

    try {
      resentFriendsActions.markFollow(currentUser.id, userId)
      const profile = await extra.services.friends.followUser({ userId })
      return { profile, currentUserId: currentUser.id, currentUserProfile: currentUser };
    } catch (e) {
      resentFriendsActions.clearFollow(currentUser.id, userId)
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to follow user')
      )
    }
  }
)
