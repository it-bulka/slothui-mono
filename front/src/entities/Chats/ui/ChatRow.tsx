import { AvatarWithInfo, Badge, List } from '@/shared/ui';
import Arrow from '@/shared/assets/images/general/arrow-up-right.svg?react'

export interface ChatRowProps {
  name: string;
  avatar?: string;
  messagePreview?: string;
  onClick: () => void;
  unreadCount?: number;
}
export const ChatRow = ({ avatar, name, messagePreview, onClick, unreadCount  }: ChatRowProps) => {
  return (
    <List.Item btnIcon={Arrow} onClick={onClick} className="flex">
      <AvatarWithInfo name={name} src={avatar} position={messagePreview || ''} className="grow"/>
      { unreadCount && <Badge>{unreadCount}</Badge>}
    </List.Item>
  )
}