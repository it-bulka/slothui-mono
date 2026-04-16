import { List } from '@/shared/ui';
import { type Chat } from '../model/types/chat.type.ts';
import { ChatRow } from './ChatRow.tsx';
import { useGoToChat } from '@/entities/Chats/model/hooks/useGoToChat.tsx';
import { useUnreadMessagesByChatSelect } from '@/entities/NotificationsCounters';

export const Chats = ({ chats, className }: { chats: Chat[], className?: string }) => {
  const { goToChat } = useGoToChat()
  const unreadByChat = useUnreadMessagesByChatSelect()

  return (
    <List className={className}>
      {chats.map(chat => (
        <ChatRow
          key={chat.id}
          name={chat.name}
          avatar={chat.avatarUrl}
          messagePreview={chat.lastMessage?.text}
          onClick={goToChat(chat.id)}
          unreadCount={unreadByChat[chat.id] || undefined}
        />
      ))}
    </List>
  )
}