import { useAppSelector } from '@/shared/config/redux';
import { selectFollowersStateByUser } from '../selectors';

export const useFollowersStateSelect = (id?: string) => {
  return useAppSelector(state => selectFollowersStateByUser(state, id));
}