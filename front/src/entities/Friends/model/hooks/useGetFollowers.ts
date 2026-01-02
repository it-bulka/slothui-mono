import { useAppDispatch } from '@/shared/config/redux';
import { fetchFollowers } from '../thunk/fetchFollowers.thunk.ts';

export const useGetFollowers = () => {
  const dispatch = useAppDispatch();

  const getUserFollowers = ({ userId }: { userId: string }) => {
    return dispatch(fetchFollowers({ userId}))
  }

  return { getUserFollowers }
}