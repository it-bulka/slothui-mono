import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { useSelectFeedPosts } from '@/entities';
import { Typography } from '@/shared/ui';
import { memo } from 'react';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const HomeFeedContent = memo(() => {
  const { posts } = useSelectFeedPosts();
  const currentUserId = useAuthUserIdSelector()

  if(!posts?.length) return <Typography bold>No any posts yet</Typography>
  return posts.map((post) => {
    const isMe = currentUserId === post.author.id
    return (
      <PostCard
        postId={post.id}
        key={post.id}
        profileLink={isMe ? getMyPostsPage() : getUserPage(post.author.id)}
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
    )
  })
})

HomeFeedContent.displayName = 'HomeFeedContent'