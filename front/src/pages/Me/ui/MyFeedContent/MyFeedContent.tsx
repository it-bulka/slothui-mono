import {
  useProfileFeedStateSelector,
  useProfilePostsSelector,
  useFetchMyPosts
} from '@/entities';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { memo, useEffect, useRef, useCallback } from 'react';
import { useAuthUserSelector } from '@/entities';
import { useInfiniteScroll } from '@/shared/hooks';
import { useIsPostCreating } from '@/features/PostComposer';

export const MyFeedContent = memo(() => {
  const userId = useAuthUserSelector()?.id;

  const posts = useProfilePostsSelector(userId);
  const { hasMore, nextCursor } = useProfileFeedStateSelector(userId);
  const isPostCreating = useIsPostCreating()
  const { fetchPosts } = useFetchMyPosts()

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;
    if (!hasMore) return;
    if (posts.length) return;
    if (isPostCreating) return;

    fetchPosts();
  }, [fetchPosts, hasMore, posts.length, isPostCreating, userId]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isPostCreating) return;
    fetchPosts({ cursor: nextCursor });
  }, [hasMore, isPostCreating, fetchPosts, nextCursor]);

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    isLoading: isPostCreating,
    hasMore: !!hasMore,
    onLoadMore: handleLoadMore,
  });

  if(!posts?.length) return <Typography bold>No any posts yet</Typography>

  return (
    <>
      {posts.map((post) => (
        <PostCard
          postId={post.id}
          key={post.id}
          userId={post.author?.id}
          userName={post.author?.nickname}
          userPosition={post.author?.nickname}
          avatarSrc={post.author?.avatarUrl}
          file={post.attachments?.file}
          video={post.attachments?.video}
          audio={post.attachments?.audio}
          images={post.attachments?.images}
          text={post.text}
        />
      ))}
      {hasMore && <div ref={triggerRef} />}
    </>
  )
})

MyFeedContent.displayName = 'MyFeedContent';