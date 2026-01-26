import { useAppDispatch } from '@/shared/config/redux';
import { fetchMyPostsThunk } from '../thunks/fetchMyPosts.thunk.ts';
import { useCallback } from 'react';

export const useFetchMyPosts = () => {
  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(({ cursor, currentUserId }: { cursor?: string | null, currentUserId: string }) => {
    dispatch(fetchMyPostsThunk({ cursor, currentUserId }))
  }, [dispatch]);

  return { fetchPosts };
}