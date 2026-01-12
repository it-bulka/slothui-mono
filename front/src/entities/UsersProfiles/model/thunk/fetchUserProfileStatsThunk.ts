// entities/usersProfiles/model/thunks/fetchUserProfileStats.thunk.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { UserProfileStats } from '../types/usersProfiles.types';

const TTL = 60_000; // 1m

export const fetchUserProfileStatsThunk = createAsyncThunk<
  UserProfileStats,
  { userId: string },
  ThunkAPI
>(
  'usersProfiles/fetchUserProfileStats',
  async ({ userId }, { extra, getState, rejectWithValue }) => {
    const state = getState();
    const cached = state.usersProfiles.entities[userId];

    if (cached && Date.now() - cached.fetchedAt < TTL) {
      return cached;
    }

    try {
      const data = await extra.services.user.getProfileStats(userId);

      return {
        userId,
        postsCount: data.postsCount,
        followersCount: data.followersCount,
        followingCount: data.followingCount,
        fetchedAt: Date.now(),
      };
    } catch {
      return rejectWithValue('Failed to fetch user profile stats');
    }
  }
);
