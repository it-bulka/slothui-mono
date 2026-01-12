export interface ProfileAnalytics {
  delta: number      // +120
  percent: number    // +8.3%
  period: 'month'
}

export interface ProfileAnalyticsState {
  data?: ProfileAnalytics;
  fetchedAt?: number | null;

  isLoading: boolean;
  error?: string;
}
