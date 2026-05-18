import { useProfileFeedStateSelector, useProfilePostsSelector, useFetchMyPosts } from '@/entities/Post';
import { Typography } from '@/shared/ui/Typography/Typography';
import { memo, useEffect, useCallback } from 'react';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { useInfiniteScroll } from '@/shared/hooks';
import { useIsPostCreating } from '@/features/PostComposer';
import { PostFeedItem } from '@/widgets/PostCard/PostFeedItem/PostFeedItem.tsx';
import { NoMyPostsYet } from './NoMyPostsYet.tsx';

export const MyFeedContent = memo(() => {
  const userId = useAuthUserSelector()?.id;

  const posts = useProfilePostsSelector(userId);
  const { hasMore, nextCursor, isLoading } = useProfileFeedStateSelector(userId);
  const isPostCreating = useIsPostCreating()
  const { fetchPosts } = useFetchMyPosts()

  useEffect(() => {
    if (!userId) return;
    if (!hasMore) return;
    if (posts.length) return;
    if (isPostCreating) return;

    fetchPosts({ currentUserId: userId });
  }, [fetchPosts, hasMore, posts.length, isPostCreating, userId]);

  const handleLoadMore = useCallback(() => {
    if (!userId) return;

    fetchPosts({ cursor: nextCursor, currentUserId: userId });
  }, [fetchPosts, nextCursor, userId]);

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading: isPostCreating || isLoading,
    onLoadMore: handleLoadMore,
  });

  if(!posts?.length && !isLoading && !isPostCreating) return <NoMyPostsYet />

  return (
    <>
      {posts.map((post) => (
        <PostFeedItem key={post.id} post={post} />
      ))}
      {isPostCreating && <Typography bold className="text-center">Loading more...</Typography>}
      <div ref={setTrigger} className='h-[20px] bg-red'/>
    </>
  )
})

MyFeedContent.displayName = 'MyFeedContent';