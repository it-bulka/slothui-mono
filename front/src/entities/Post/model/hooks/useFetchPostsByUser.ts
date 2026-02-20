import { useAppDispatch } from '@/shared/config/redux';
import { fetchPostsByUserThunk } from '../thunks/fetchPostsByUser.thunk.ts';
import { useCallback } from 'react';

export const useFetchPostsByUser = () => {
  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(({userId }: { userId: string }) => {
    dispatch(fetchPostsByUserThunk({ userId }))
  }, [dispatch]);

  return { fetchPosts };
}