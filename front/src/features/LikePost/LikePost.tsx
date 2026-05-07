import { ActionButton } from '@/shared/ui';
import LikeSvg from '@/shared/assets/images/post/like.svg?react'
import { useToggleLikePost, usePostLikeSelect } from '@/entities';
import { memo, useCallback } from 'react';

export const LikePost = memo(({ postId, showText = true, className }: { postId: string; showText?: boolean, className?: string }) => {
  const { isLiked, likesCount } = usePostLikeSelect(postId);
  const { toggleLikePost } = useToggleLikePost()

  const handleToggle = useCallback(() => {
    toggleLikePost({ postId, liked: isLiked });
  }, [toggleLikePost, postId, isLiked]);

  return (
    <ActionButton Icon={LikeSvg} isActive={isLiked} onClick={handleToggle} className={className}>
      {likesCount}{showText && ' Likes'}
    </ActionButton>
  )
})

LikePost.displayName = 'LikePost';