import { useAppDispatch } from '@/shared/config/redux';
import { fetchStoriesThunk } from '../thunks/fetchStories.thunk.ts';
import { useCallback } from 'react';

export const useFetchAllStories = () => {
  const dispatch = useAppDispatch();

  const fetchAllStories = useCallback(() => {
    dispatch(fetchStoriesThunk({}))
  }, [dispatch]);

  return { fetchAllStories}
}