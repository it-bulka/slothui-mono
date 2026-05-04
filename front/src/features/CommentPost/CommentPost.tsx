import { ActionButton } from '@/shared/ui';
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'
import { useSelectPostById, useReplyTarget } from '@/entities';

export const CommentPost = ({ postId, onCommentClick, showText = true, className }: { postId: string; onCommentClick?: () => void; showText?: boolean, className?: string }) => {
  const post = useSelectPostById(postId)
  const { setReplyTarget } = useReplyTarget()

  return (
    <ActionButton Icon={CommentSvg} onClick={() => {
      onCommentClick?.()
      setReplyTarget({ type: 'post', postId })
    }}
    className={className}
    >
      {post.commentsCount}{showText && ' Comments'}
    </ActionButton>
  )
}