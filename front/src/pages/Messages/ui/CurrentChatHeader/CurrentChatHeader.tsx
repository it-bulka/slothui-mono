import { AvatarWithInfo } from '@/shared/ui';
import { useActiveChatDataSelector } from '@/entities';
import { memo } from 'react';

export const CurrentChatHeader = memo(() => {
  const chat = useActiveChatDataSelector()
  if(!chat) return null;

  return (
    <div className="border-style-b px-6 py-4">
      <AvatarWithInfo
        src={chat.anotherMember?.avatarUrl || chat.avatarUrl}
        name={chat.anotherMember?.name || chat.name}
        position={chat.anotherMember?.nickname ? `@${chat.anotherMember?.nickname}` : ''}
      />
    </div>
  )
})

CurrentChatHeader.displayName = "CurrentChatHeader";