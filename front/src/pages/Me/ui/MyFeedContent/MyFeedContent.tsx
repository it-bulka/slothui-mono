import {
  useProfileFeedStateSelector,
  useProfilePostsSelector,
  useFetchMyPosts
} from '@/entities';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { memo, useEffect, useCallback } from 'react';
import { useAuthUserSelector } from '@/entities';
import { useInfiniteScroll } from '@/shared/hooks';
import { useIsPostCreating } from '@/features/PostComposer';

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
      {isPostCreating && <Typography bold className="text-center">Loading more...</Typography>}
      <div ref={setTrigger} className='h-[20px] bg-red'/>
    </>
  )
})

MyFeedContent.displayName = 'MyFeedContent';