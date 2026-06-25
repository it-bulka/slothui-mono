import { memo, useCallback } from 'react';
import { ActionButton } from '@/shared/ui/ActionButton';
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'
import { useSelectPostById } from '@/entities/Post'
import { useReplyTarget } from '@/entities/ReplyTarget';

export const CommentPost = memo(({ postId, onCommentClick, showText = true, className }: { postId: string; onCommentClick?: () => void; showText?: boolean, className?: string }) => {
  const post = useSelectPostById(postId)
  const { setReplyTarget } = useReplyTarget()

  const handleClick = useCallback(() => {
    onCommentClick?.();
    setReplyTarget({ type: 'post', postId });
  }, [onCommentClick, setReplyTarget, postId]);

  return (
    <ActionButton Icon={CommentSvg} onClick={handleClick} className={className} aria-label="Comment">
      {post.commentsCount}{showText && ' Comments'}
    </ActionButton>
  )
})

CommentPost.displayName = 'CommentPost';