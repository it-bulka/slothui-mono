import { useSelectFeedPosts, useSelectHomePostsMeta, fetchFeedPostsThunk } from '@/entities/Post'
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';

export const useHomeFeed = () => {
  const { posts } = useSelectFeedPosts()
  const currentUserId = useAuthUserIdSelector()
  const { hasMore, isLoading, nextCursor } = useSelectHomePostsMeta()
  const dispatch = useAppDispatch()

  const loadMore = useCallback(() => {
    if (!nextCursor) return
    dispatch(fetchFeedPostsThunk({ cursor: nextCursor }))
  }, [nextCursor, dispatch])

  return {
    posts,
    currentUserId,
    hasMore,
    isLoading,
    loadMore
  }
}