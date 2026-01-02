import { useAppDispatch } from '@/shared/config/redux';
import { removeFollowerThunk } from '../thunk/removeFollower.thunk.ts';

export const useRemoveFollower = () => {
  const dispatch = useAppDispatch();

  const removeFollower = (userId: string) => {
    return dispatch(removeFollowerThunk({ followerId: userId }));
  }

  return { removeFollower }
}