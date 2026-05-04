import { ActionButton } from '@/shared/ui';
import LikeSvg from '@/shared/assets/images/post/like.svg?react'
import { useToggleLikePost, usePostLikeSelect } from '@/entities';
import { memo } from 'react';

export const LikePost = memo(({ postId, showText = true, className }: { postId: string; showText?: boolean, className?: string }) => {
  const { isLiked, likesCount } = usePostLikeSelect(postId);
  const { toggleLikePost } = useToggleLikePost()

  return (
    <ActionButton Icon={LikeSvg} isActive={isLiked} onClick={() => toggleLikePost({ postId, liked: isLiked})} className={className}>
      {likesCount}{showText && ' Likes'}
    </ActionButton>
  )
})

LikePost.displayName = 'LikePost';