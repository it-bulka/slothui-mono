import { ActionButton } from '@/shared/ui';
import SendSvg from '@/shared/assets/images/message/send.svg?react'

export const SendAction = () => {
  return (
    <ActionButton variant="secondary" Icon={SendSvg}/>
  )
}