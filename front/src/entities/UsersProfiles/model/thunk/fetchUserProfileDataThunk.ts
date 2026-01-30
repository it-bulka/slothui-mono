import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { OtherUserWithStats } from '@/shared/types';

const TTL = 60_000; // 1m

export const fetchUserProfileDataThunk = createAsyncThunk<
  // full data. Update userProfile & friends slice
  { profile: OtherUserWithStats, currentUserId: string },
  { userId: string },
  ThunkAPI
>(
  'usersProfiles/fetchUserProfileData',
  async ({ userId }, { extra, rejectWithValue, getState }) => {
    const state = getState();
    console.log('fetchUserProfileData', state.authUser)
    const currentUserId = state.authUser?.data?.id;
    if(!currentUserId) {
      return rejectWithValue('Failed to fetch user profile stats. No authorized user');
    }
    try {
      const data = await extra.services.user.getProfileData(userId);

      return { profile: data, currentUserId };
    } catch {
      return rejectWithValue('Failed to fetch user profile stats');
    }
  },

  {
    condition: ({ userId }, { getState }) => {
      const state = getState();
      const cached = state.usersProfiles.entities[userId];

      if (cached && Date.now() - cached.fetchedAt < TTL) return false;

      return true;
    },
  }
);
