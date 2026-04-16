import type { UserShort } from '@/shared/types';

export interface ProfileAnalytics {
  delta: number      // +120
  percent: number    // +8.3%
  period: 'month'
  lastFollowers: UserShort[]
}

export interface ProfileAnalyticsState {
  data?: ProfileAnalytics;
  fetchedAt?: number | null;

  isLoading: boolean;
  error?: string;
}
