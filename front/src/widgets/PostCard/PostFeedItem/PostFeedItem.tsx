import { memo } from 'react';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { PostCardWithDelete } from '@/features/DeletePost';
import type { PostWithAttachmentsDto } from '@/shared/types/posts.types.ts';
import { usePostGroupedAttachments } from '@/entities/Post';

interface PostFeedItemProps {
  post: PostWithAttachmentsDto;
}

export const PostFeedItem = memo(({ post }: PostFeedItemProps) => {
  const currentUserId = useAuthUserIdSelector();
  const isOwner = currentUserId === post.author.id;
  const grouped = usePostGroupedAttachments(post.id);

  return (
    <PostCardWithDelete
      postId={post.id}
      isOwner={isOwner}
      profileLink={isOwner ? getMyPostsPage() : getUserPage(post.author.id)}
      userId={post.author.id}
      userName={post.author.nickname}
      userPosition={post.author.nickname}
      avatarSrc={post.author.avatarUrl}
      file={grouped.file}
      video={grouped.video}
      audio={grouped.audio}
      images={grouped.images}
      text={post.text}
      poll={post.poll}
    />
  );
});

PostFeedItem.displayName = 'PostFeedItem';
