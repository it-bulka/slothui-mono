import { useAppDispatch } from '@/shared/config/redux';
import { fetchUserStoriesThunk } from '../thunks/fetchUserStories.thunk.ts';
import { useCallback } from 'react';

export const useFetchStoriesByUser = () => {
  const dispatch = useAppDispatch();

  const fetchStoriesByUser = useCallback((userId: string) => {
    dispatch(fetchUserStoriesThunk(userId))
  }, [dispatch]);

  return { fetchStoriesByUser }
}