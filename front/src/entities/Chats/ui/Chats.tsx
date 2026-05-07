import { List } from '@/shared/ui';
import { type Chat } from '../model/types/chat.type.ts';
import { ChatRow } from './ChatRow.tsx';
import { useGoToChat } from '@/entities/Chats/model/hooks/useGoToChat.tsx';
import { useUnreadMessagesByChatSelect } from '@/entities/NotificationsCounters';
import { memo, useCallback } from 'react';

interface ChatItemProps {
  chat: Chat;
  unreadCount?: number;
  onSelect: (chatId: string) => void;
}

const ChatItem = memo(({ chat, unreadCount, onSelect }: ChatItemProps) => {
  const handleClick = useCallback(() => onSelect(chat.id), [chat.id, onSelect]);
  return (
    <ChatRow
      name={chat.name}
      avatar={chat.avatarUrl}
      messagePreview={chat.lastMessage?.text}
      onClick={handleClick}
      unreadCount={unreadCount}
    />
  );
});

ChatItem.displayName = 'ChatItem';

export const Chats = ({ chats, className }: { chats: Chat[], className?: string }) => {
  const { goToChat } = useGoToChat()
  const unreadByChat = useUnreadMessagesByChatSelect()

  const handleSelect = useCallback(
    (chatId: string) => goToChat(chatId)(),
    [goToChat]
  );

  return (
    <List className={className}>
      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          chat={chat}
          unreadCount={unreadByChat[chat.id] || undefined}
          onSelect={handleSelect}
        />
      ))}
    </List>
  )
}
