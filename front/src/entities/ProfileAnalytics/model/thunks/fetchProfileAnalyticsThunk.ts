import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { ProfileAnalytics } from '../types/profile-analitycs.types.ts';

export const fetchProfileAnalyticsThunk = createAsyncThunk<
  ProfileAnalytics,
  void,
  ThunkAPI
>(
  'profileAnalytics/fetch',
  async (_, { extra, rejectWithValue }) => {
    try {
      const res = await extra.services.user.getAnalytics();

      return {
        delta: res.delta,
        percent: res.percent,
        period: res.period,
      }
    } catch {
      return rejectWithValue('Failed to fetch profile analytics');
    }
  }
);
