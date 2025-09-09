import { ActionButton } from '@/shared/ui';
import ShareSvg from '@/shared/assets/images/post/share.svg?react'

export const SharePost = () => {
  //TODO: add dynamic amount of sharing
  const amount = 268

  return (
    <ActionButton Icon={ShareSvg}>
      {amount} Shares
    </ActionButton>
  )
}