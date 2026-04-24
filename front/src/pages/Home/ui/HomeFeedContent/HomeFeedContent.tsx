import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { memo } from 'react';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useInfiniteScroll } from '@/shared/hooks';
import { useHomeFeed } from '../../model/hooks/useHomePostFeed.ts';

export const HomeFeedContent = memo(() => {
  const { posts, hasMore, isLoading, loadMore, currentUserId } = useHomeFeed()

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading: isLoading,
    onLoadMore: loadMore
  });

  if(!posts?.length) return <Typography bold>No any posts yet</Typography>
  return (
    <>
      {posts.map((post) => {
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
            file={post.attachments?.file}
            video={post.attachments?.video}
            audio={post.attachments?.audio}
            images={post.attachments?.images}
            text={post.text}
            poll={post.poll}
          />
        )
      })}
      {isLoading && <Typography>Loading...</Typography>}
      <div ref={setTrigger} className="h-[2px] mb-[5px]"/>
    </>
  )
})

HomeFeedContent.displayName = 'HomeFeedContent'