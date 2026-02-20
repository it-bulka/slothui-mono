import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui'
import { getMyPostsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { useInfiniteScroll } from '@/shared/hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { useUserPosts } from '@/pages/User/model/useUserPosts.ts';

export const UserFeedContent = ({ userId }: { userId: string }) => {
  const currentUserId = useAuthUserIdSelector()
  const { posts, isLoading, hasMore, fetchPosts, error } = useUserPosts({ userId });

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore && !error,
    isLoading: isLoading,
    onLoadMore: fetchPosts
  });

  useEffect(() => {
    if(error) toast.error(error);
  }, [error])

  if(!posts?.length && !isLoading) return <Typography bold>No any posts yet</Typography>

  return (
    <>
      {
        posts.map((post) => {
          const isMe = currentUserId === post.author.id
          return (
            <PostCard
              postId={post.id}
              key={post.id}
              profileLink={isMe ? getMyPostsPage() : getUserPage(post.author.id)}
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
          )
        })
      }
      {isLoading && <Typography bold>Loading...</Typography>}
      <div ref={setTrigger} />
    </>
  )
}