import { List } from '@/shared/ui';
import { type Chat } from '../model/slice.ts';
import { ChatRow } from './ChatRow.tsx';
import { useGoToChat } from '@/entities/Chats/model/hooks/useGoToChat.tsx';

export const Chats = ({ chats }: { chats: Chat[]}) => {
 const { goToChat } = useGoToChat()
  return (
    <List>
      {chats.map(chat => (
        <ChatRow
          key={chat.id}
          name={chat.name}
          avatar={chat.avatarUrl}
          messagePreview={chat.lastMessage?.text}
          onClick={goToChat(chat.id)}
        />
      ))}
    </List>
  )
}