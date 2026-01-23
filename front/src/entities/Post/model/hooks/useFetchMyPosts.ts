import { useAppDispatch } from '@/shared/config/redux';
import { fetchMyPostsThunk } from '../thunks/fetchMyPosts.thunk.ts';
import { useCallback } from 'react';

export const useFetchMyPosts = () => {
  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(({ cursor}: { cursor?: string | null } = {}) => {
    dispatch(fetchMyPostsThunk({ cursor}))
  }, [dispatch]);

  return { fetchPosts };
}