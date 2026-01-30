import { useAppSelector } from '@/shared/config/redux';
import { selectFolloweeStateByUser } from '../selectors';

export const useFolloweeStateSelect = (id?: string) => {
  return useAppSelector(state => selectFolloweeStateByUser(state, id));
}