import { useAppDispatch } from '@/shared/config/redux';
import { followUserThunk } from '../thunk/followUser.thunk.ts';

export const useFollowUser = () => {
  const dispatch = useAppDispatch();

  const followUser = (userId: string) => {
    return dispatch(followUserThunk({ userId}))
  }

  return { followUser }
}