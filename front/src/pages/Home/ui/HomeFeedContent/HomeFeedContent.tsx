import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { useSelectFeedPosts } from '@/entities';
import { Typography } from '@/shared/ui';
import { memo } from 'react';

export const HomeFeedContent = memo(() => {
  const { posts } = useSelectFeedPosts();

  if(!posts?.length) return <Typography bold>No any posts yet</Typography>
  return posts.map((post) => (
    <PostCard
      postId={post.id}
      userId={post.author.id}
      userName={post.author.nickname}
      userPosition={post.author.nickname}
      avatarSrc={post.author.avatarUrl}
      file={post.attachments.file}
      video={post.attachments.video}
      audio={post.attachments.audio}
      images={post.attachments.images}
      text={post.text}
    />
  ))
})

HomeFeedContent.displayName = 'HomeFeedContent'