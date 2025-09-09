import { ActionButton } from '@/shared/ui';
import NotificationSvg from '@/shared/assets/images/sidebar/notification.svg?react'

export const NotificationAction = () => {
  return <ActionButton variant="secondary" Icon={NotificationSvg}/>
}