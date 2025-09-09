import { ActionButton } from '@/shared/ui';
import LikeSvg from '@/shared/assets/images/post/like.svg?react'

export const LikePost = () => {
  //TODO: add dynamic ammount of likes
  const amount = 12

  return (
    <ActionButton Icon={LikeSvg}>
      {amount} Likes
    </ActionButton>
  )
}