import { useAppSelector } from '@/shared/config/redux';
import { selectProfileAnalytics } from '../selectors/profileAnalyticsSelectors.ts';

export const useProfileAnalyticsSelect = () => {
  return useAppSelector(selectProfileAnalytics);
}