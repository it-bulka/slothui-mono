import { useAppSelector } from '@/shared/config/redux';
import { selectFollowingsByUser } from '../selectors/selectFollowingsByUser.tsx';

export const useFollowingsSelector = (id?: string) => {
  return useAppSelector(selectFollowingsByUser(id));
}