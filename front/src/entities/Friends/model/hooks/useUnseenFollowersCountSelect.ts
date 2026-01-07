import { selectUnseenFollowersCount } from '../selectors/selectUnseenFollowersCount.ts';
import { useAppSelector } from '@/shared/config/redux';

export const useUnseenFollowersCountSelect = (userId?: string) => {
  return useAppSelector(state => selectUnseenFollowersCount(state, userId));
}