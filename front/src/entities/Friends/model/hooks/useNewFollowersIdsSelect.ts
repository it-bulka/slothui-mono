import { useAppSelector } from '@/shared/config/redux';
import { selectNewFollowersIds } from '../selectors/selectNewFollowersIds.ts';

export const useNewFollowersIdsSelect = (userId?: string) => {
  return useAppSelector(state => selectNewFollowersIds(state, userId))
}