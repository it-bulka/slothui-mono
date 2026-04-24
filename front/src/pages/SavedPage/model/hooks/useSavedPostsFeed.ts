import { useEffect, useCallback } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { fetchSavedPostsThunk } from '@/entities/Post/model/thunks/fetchSavedPosts.thunk.ts';
import { useSelectSavedPosts, useSelectSavedPostsMeta } from '@/entities/Post';
import { useInfiniteScroll } from '@/shared/hooks';

export const useSavedPostsFeed = () => {
  const dispatch = useAppDispatch();

  const { posts } = useSelectSavedPosts();
  const { hasMore, isLoading, nextCursor } = useSelectSavedPostsMeta();

  const loadMore = useCallback(() => {
    if (!nextCursor) return;
    dispatch(fetchSavedPostsThunk({ cursor: nextCursor }));
  }, [dispatch, nextCursor]);

  useEffect(() => {
    if (posts?.length) return;
    dispatch(fetchSavedPostsThunk({ cursor: null }));
  }, [dispatch, posts]);

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading,
    onLoadMore: loadMore,
  });

  return {
    posts,
    setTrigger,
    isLoading
  };
};