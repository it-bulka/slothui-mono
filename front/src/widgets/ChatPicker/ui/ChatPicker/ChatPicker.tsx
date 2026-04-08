import { useUserChatSelect, useFetchMyChats, useUserChatStateSelect } from '@/entities';
import { Avatar, Skeleton } from '@/shared/ui';
import { memo, useEffect } from 'react';
import type { ChatDTO } from '@/shared/types/chat.types.ts';

interface ChatPickerProps {
  onSelect: (chatId: string) => void;
  className?: string;
}

const getChatDisplay = (chat: ChatDTO) => ({
  name: chat.name || chat.anotherMember?.nickname || chat.anotherMember?.username || 'Chat',
  avatar: chat.avatarUrl || chat.anotherMember?.avatarUrl,
})

export const ChatPicker = memo(({ onSelect, className }: ChatPickerProps) => {
  const chats = useUserChatSelect();
  const { isLoading } = useUserChatStateSelect();
  const { fetchMyChats } = useFetchMyChats();

  useEffect(() => {
    if (!chats.length && !isLoading) {
      fetchMyChats()
    }
  }, [chats, fetchMyChats, isLoading])

  if (isLoading && !chats.length) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[56px]">
            <Skeleton width={40} height={40} border="50%" />
            <Skeleton width={48} height={10} border="4px" />
          </div>
        ))}
      </div>
    )
  }

  if (!chats.length) return <div className="text-center text-sm py-4 opacity-50">No chats yet</div>;

  return (
    <div className={`flex gap-4 overflow-x-auto pb-2 ${className ?? ''}`}>
      {chats.map(chat => {
        const { name, avatar } = getChatDisplay(chat)
        return (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className="flex flex-col items-center gap-1 min-w-[56px] cursor-pointer"
            type="button"
          >
            <Avatar src={avatar} name={name} size="md" />
            <span className="text-xs text-center w-14 truncate">{name}</span>
          </button>
        )
      })}
    </div>
  )
})

ChatPicker.displayName = 'ChatPicker'
