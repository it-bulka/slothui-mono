import { ActionButton } from '@/shared/ui';
import LikeSvg from '@/shared/assets/images/post/like.svg?react'
import { useToggleLikePost, usePostLikeSelect } from '@/entities';
import { memo } from 'react';

export const LikePost = memo(({ postId }: { postId: string}) => {
  const { isLiked, likesCount } = usePostLikeSelect(postId);
  const { toggleLikePost } = useToggleLikePost()

  return (
    <ActionButton Icon={LikeSvg} onClick={() => toggleLikePost({ postId, liked: isLiked})}>
      {likesCount} Likes
    </ActionButton>
  )
})

LikePost.displayName = 'LikePost';