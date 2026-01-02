import { useAppSelector } from '@/shared/config/redux';
import { selectFollowersByUser } from '../selectors/selectFollowersByUser.ts';

export const useFollowersSelector = (id?: string) => {
  return useAppSelector(selectFollowersByUser(id));
}