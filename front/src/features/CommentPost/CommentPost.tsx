import { ActionButton } from '@/shared/ui';
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'
import { useSelectPostById, useReplyTarget } from '@/entities';

export const CommentPost = ({ postId, onCommentClick }: { postId: string, onCommentClick?: () => void }) => {
  const post = useSelectPostById(postId)
  const { setReplyTarget } = useReplyTarget()

  return (
    <ActionButton Icon={CommentSvg} onClick={() => {
      onCommentClick?.()
      setReplyTarget({ type: 'post', postId })
    }}>
      {post.commentsCount} Comments
    </ActionButton>
  )
}