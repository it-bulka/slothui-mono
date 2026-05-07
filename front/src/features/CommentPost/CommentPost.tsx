import { memo, useCallback } from 'react';
import { ActionButton } from '@/shared/ui';
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'
import { useSelectPostById, useReplyTarget } from '@/entities';

export const CommentPost = memo(({ postId, onCommentClick, showText = true, className }: { postId: string; onCommentClick?: () => void; showText?: boolean, className?: string }) => {
  const post = useSelectPostById(postId)
  const { setReplyTarget } = useReplyTarget()

  const handleClick = useCallback(() => {
    onCommentClick?.();
    setReplyTarget({ type: 'post', postId });
  }, [onCommentClick, setReplyTarget, postId]);

  return (
    <ActionButton Icon={CommentSvg} onClick={handleClick} className={className}>
      {post.commentsCount}{showText && ' Comments'}
    </ActionButton>
  )
})

CommentPost.displayName = 'CommentPost';