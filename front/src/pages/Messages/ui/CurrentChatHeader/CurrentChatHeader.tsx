import { AvatarWithInfo } from '@/shared/ui';
import { Link } from 'react-router';
import { useActiveChatDataSelector } from '@/entities';
import { memo } from 'react';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const CurrentChatHeader = memo(() => {
  const chat = useActiveChatDataSelector()
  if(!chat) return null;

  const avatarWithInfo = (
    <AvatarWithInfo
      src={chat.anotherMember?.avatarUrl || chat.avatarUrl}
      name={chat.anotherMember?.username || chat.name}
      position={chat.anotherMember?.nickname ? `@${chat.anotherMember?.nickname}` : ''}
    />
  )

  return (
    <div className="border-style-b px-6 py-4">
      {chat.anotherMember
        ? <Link to={getUserPage(chat.anotherMember.id)}>{avatarWithInfo}</Link>
        : avatarWithInfo
      }
    </div>
  )
})

CurrentChatHeader.displayName = "CurrentChatHeader";