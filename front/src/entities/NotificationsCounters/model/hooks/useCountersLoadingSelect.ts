import { useAppSelector } from '@/shared/config/redux';
import {
  selectCountersLoading
} from '../selectors/notificationCounters.selectors.ts';

export const useCountersLoadingSelect = () => {
  return useAppSelector(selectCountersLoading)
}