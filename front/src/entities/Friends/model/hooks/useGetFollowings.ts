import { useAppDispatch } from '@/shared/config/redux';
import { fetchFollowings } from '../thunk/fetchFollowings.thunk.ts';

export const useGetFollowings = () => {
  const dispatch = useAppDispatch();

  const getFollowings = ({ userId }: { userId: string }) => {
    return dispatch(fetchFollowings({ userId}))
  }

  return { getFollowings }
}