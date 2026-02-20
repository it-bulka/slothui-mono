import { useFetchPostsByUser, useProfileFeedStateSelector, useProfilePostsSelector } from '@/entities';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import type { PostWithAttachmentsDto } from '@/shared/types';
import { usePostsService } from '@/shared/libs/services/context';

export const useUserPosts = ({ userId }: { userId: string }) => {
  const cachedPosts = useProfilePostsSelector(userId);
  const cachedMeta = useProfileFeedStateSelector(userId);
  const { fetchPosts: fetchCachedPosts } = useFetchPostsByUser()

  const [extraPosts, setExtraPosts] = useState<PostWithAttachmentsDto[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localHasMore, setLocalHasMore] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const postsService = usePostsService()

  const cursorRef = useRef<string | null>(cachedMeta.nextCursor);
  const hasMoreRef = useRef<boolean>(cachedMeta.hasMore);
  const loadingRef = useRef(false);


  useEffect(() => {
    if(!cachedPosts.length && !cachedMeta.isLoading) {
      fetchCachedPosts({ userId })
    }
  }, [fetchCachedPosts, cachedPosts, cachedMeta.isLoading, userId]);

  useEffect(() => {
    if (!extraPosts.length) {
      cursorRef.current = cachedMeta.nextCursor;
      hasMoreRef.current = cachedMeta.hasMore;
    }
  }, [cachedMeta.nextCursor, cachedMeta.hasMore, extraPosts]);

  const fetchPosts = useCallback(async () => {
    if (!hasMoreRef.current || loadingRef.current) return;
    loadingRef.current = true;
    setLocalLoading(true);

    try {
      const res = await postsService.getList({
        cursor: cursorRef.current,
        userId
      });

      setExtraPosts(prev => [...prev, ...res.items]);
      cursorRef.current = res.nextCursor;
      hasMoreRef.current = res.hasMore;
      setLocalHasMore(res.hasMore);

      loadingRef.current = false;
      setLocalLoading(false);
    } catch (err) {
      setLocalError((err as Error)?.message || 'Failed to load posts');
      setLocalLoading(false);
    }
  }, [postsService, userId]);

  const posts = useMemo(
    () => [...cachedPosts, ...extraPosts],
    [cachedPosts, extraPosts]
  );

  return {
    posts,
    fetchPosts,
    isLoading: cachedMeta.isLoading || localLoading,
    hasMore: localHasMore,
    error: cachedMeta.error || localError,
  };
};