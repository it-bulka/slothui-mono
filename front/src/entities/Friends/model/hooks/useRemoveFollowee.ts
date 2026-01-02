import { useAppDispatch } from '@/shared/config/redux';
import { removeFolloweeThunk } from '../thunk/removeFolowee.thunk.ts';

export const useRemoveFollowee = () => {
  const dispatch = useAppDispatch();

  const removeFollowee = (userId: string) => {
    return dispatch(removeFolloweeThunk({ followeeId: userId }));
  }

  return { removeFollowee }
}