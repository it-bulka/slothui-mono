import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

const selectAnalyticsSlice = (state: RootState) => state.analytics;

export const selectProfileAnalytics = createSelector(
  selectAnalyticsSlice,
  (analytics) => ({
    data: analytics.data,
    isLoading: analytics.isLoading,
    error: analytics.error,
  }),
);
