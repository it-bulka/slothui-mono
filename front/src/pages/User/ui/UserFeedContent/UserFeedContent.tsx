import { useProfilePostsSelector, useProfileFeedStateSelector, useFetchPostsByUser } from '@/entities';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { useEffect } from 'react';

export const UserFeedContent = ({ userId }: { userId: string }) => {
  const posts = useProfilePostsSelector(userId);
  const { isLoading, hasMore } = useProfileFeedStateSelector(userId);
  const { fetchPosts } = useFetchPostsByUser()

  useEffect(() => {
    if(hasMore && !posts.length && !isLoading) {
      fetchPosts({ userId })
    }
  }, [fetchPosts, hasMore, posts, isLoading, userId]);

  if(!posts?.length) return <Typography bold>No any posts yet</Typography>

  return posts.map((post) => (
    <PostCard
      postId={post.id}
      key={post.id}
      userName={post.author?.nickname}
      userPosition={post.author?.nickname}
      avatarSrc={post.author?.avatarUrl}
      userId={post.author?.id}
      file={post.attachments?.file}
      video={post.attachments?.video}
      audio={post.attachments?.audio}
      images={post.attachments?.images}
      text={post?.text || ''}
    />
  ))
}