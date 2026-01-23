import { useAppDispatch } from '@/shared/config/redux';
import { fetchPostsByUserThunk } from '../thunks/fetchPostsByUser.thunk.ts';
import { useCallback } from 'react';

export const useFetchPostsByUser = () => {
  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(({userId, cursor}: { userId: string, cursor?: string | null }) => {
    dispatch(fetchPostsByUserThunk({ userId, cursor}))
  }, [dispatch]);

  return { fetchPosts };
}