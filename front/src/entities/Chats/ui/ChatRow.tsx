import { AvatarWithInfo, List } from '@/shared/ui';
import Arrow from '@/shared/assets/images/general/arrow-up-right.svg?react'

export interface ChatRowProps {
  name: string;
  avatar?: string;
  messagePreview?: string;
  onClick: () => void;
}
export const ChatRow = ({ avatar, name, messagePreview, onClick,  }: ChatRowProps) => {
  return (
    <List.Item btnIcon={Arrow} onClick={onClick}>
      <AvatarWithInfo name={name} src={avatar} position={messagePreview || ''}/>
    </List.Item>
  )
}