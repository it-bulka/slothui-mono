import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { fetchLikedPostsThunk, useSelectLikedPostsMeta } from '@/entities';

export const useLikedPostsFeed = () => {
  const dispatch = useAppDispatch();
  const { nextCursor, hasMore, isLoading } = useSelectLikedPostsMeta();

  useEffect(() => {
    dispatch(fetchLikedPostsThunk({ cursor: null }));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    if (!nextCursor) return;

    dispatch(fetchLikedPostsThunk({ cursor: nextCursor }));
  }, [dispatch, hasMore, isLoading, nextCursor]);

  return {
    loadMore,
    hasMore,
    isLoading,
  };
};