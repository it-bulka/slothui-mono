import { useAppDispatch } from '@/shared/config/redux';
import { fetchStoriesThunk } from '../thunks/fetchStories.thunk.ts';

export const useFetchAllStories = () => {
  const dispatch = useAppDispatch();

  const fetchAllStories = () => {
    dispatch(fetchStoriesThunk({}))
  }

  return { fetchAllStories}
}