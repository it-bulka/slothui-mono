import { ActionButton } from '@/shared/ui';
import AttachSvg from '@/shared/assets/images/message/attach.svg?react'

export const AttachAction = () => {
  return (
    <ActionButton variant="secondary" Icon={AttachSvg}/>
  )
}