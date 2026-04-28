import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui'
import { NoUserPostsYet } from './NoUserPostsYet.tsx';
import { getMyPostsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { useInfiniteScroll } from '@/shared/hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { useUserPosts } from '@/pages/User/model/useUserPosts.ts';
import type { PostWithAttachmentsDto } from '@/shared/types';
import { usePostGroupedAttachments } from '@/entities/Post';

interface UserPostCardProps {
  post: PostWithAttachmentsDto;
  isMe: boolean;
}

const UserPostCard = ({ post, isMe }: UserPostCardProps) => {
  const grouped = usePostGroupedAttachments(post.id);
  return (
    <PostCard
      postId={post.id}
      profileLink={isMe ? getMyPostsPage() : getUserPage(post.author.id)}
      userName={post.author?.nickname}
      userPosition={post.author?.nickname}
      avatarSrc={post.author?.avatarUrl}
      userId={post.author?.id}
      file={grouped.file}
      video={grouped.video}
      audio={grouped.audio}
      images={grouped.images}
      text={post?.text || ''}
    />
  );
};

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

  if(!posts?.length && !isLoading) return <NoUserPostsYet />

  return (
    <>
      {posts.map((post) => (
        <UserPostCard key={post.id} post={post} isMe={currentUserId === post.author.id} />
      ))}
      {isLoading && <Typography bold>Loading...</Typography>}
      <div ref={setTrigger} />
    </>
  )
}