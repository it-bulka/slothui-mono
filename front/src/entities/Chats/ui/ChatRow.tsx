import { AvatarWithInfo } from '@/shared/ui/Avatar/AvatarWithInfo'
import { Badge } from '@/shared/ui/Badge/Badge'
import { List } from '@/shared/ui/List/List';
import Arrow from '@/shared/assets/images/general/arrow-up-right.svg?react'

export interface ChatRowProps {
  name: string;
  avatar?: string;
  messagePreview?: string;
  onClick: () => void;
  unreadCount?: number;
}
export const ChatRow = ({ avatar, name, messagePreview, onClick, unreadCount }: ChatRowProps) => {
  return (
    <List.Item btnIcon={Arrow} onRowClick={onClick}>
      <AvatarWithInfo name={name} src={avatar} position={messagePreview ?? ''} className="grow min-w-0" />
      {!!unreadCount && <Badge>{unreadCount}</Badge>}
    </List.Item>
  )
}
