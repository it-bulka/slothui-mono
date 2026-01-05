import { useAppDispatch } from '@/shared/config/redux';
import { fetchUserStoriesThunk } from '../thunks/fetchUserStories.thunk.ts';

export const useFetchStoriesByUser = () => {
  const dispatch = useAppDispatch();

  const fetchStoriesByUser = (userId: string) => {
    dispatch(fetchUserStoriesThunk(userId))
  }

  return { fetchStoriesByUser }
}