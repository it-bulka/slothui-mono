import { ActionButton } from '@/shared/ui';
import CommentSvg from '@/shared/assets/images/post/comment.svg?react'

export const CommentPost = () => {
  //TODO: add dynamic ammount of likes
  const amount = 5

  return (
    <ActionButton Icon={CommentSvg}>
      {amount} Comments
    </ActionButton>
  )
}