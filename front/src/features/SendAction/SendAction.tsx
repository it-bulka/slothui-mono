import { ActionButton } from '@/shared/ui';
import SendSvg from '@/shared/assets/images/message/send.svg?react'

export const SendAction = ({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) => {
  return (
    <ActionButton variant="secondary" Icon={SendSvg} onClick={onClick} disabled={disabled}/>
  )
}