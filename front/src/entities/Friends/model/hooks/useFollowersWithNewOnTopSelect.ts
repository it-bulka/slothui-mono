import { useAppSelector } from '@/shared/config/redux';
import { selectFollowersWithNewOnTop } from '../selectors/selectFollowersWithNewOnTop.ts';

export const useFollowersWithNewOnTopSelect = (userId?: string) => {
  return useAppSelector(state => selectFollowersWithNewOnTop(state, userId))
}