import type { RootState } from '@/app/config';

export const selectProfileAnalytics = (state: RootState) => ({
  data: state.analytics.data,
  isLoading:  state.analytics.isLoading,
  error: state.analytics.error
})