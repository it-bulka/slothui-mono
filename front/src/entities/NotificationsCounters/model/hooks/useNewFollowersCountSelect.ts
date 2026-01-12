import { useAppSelector } from '@/shared/config/redux';
import {
  selectNewFollowersCount
} from '../selectors/notificationCounters.selectors.ts';

export const useNewFollowersCountSelect = () => {
  return useAppSelector(selectNewFollowersCount)
}