import { MessageInput } from '@/widgets';
import { useManageActiveChatId, useCurrentChat } from './model';
import { useParams } from 'react-router';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { CurrentChatHeader } from './ui';
import { TypingInChat } from './ui/TypingInChat/TypingInChat.tsx';
import { MessageList } from './ui/MessageList/MessageList.tsx';

const Messages = () => {
  const { id: chatId } = useParams<{ id: string }>()
  const authUserId = useAuthUserIdSelector()
  const { typing, messages } = useCurrentChat()

  useManageActiveChatId(chatId)

  if(!authUserId || !chatId) return null;
  return (
    <div className="h-screen relative flex flex-col">
      <CurrentChatHeader />
      <MessageList chatId={chatId} authUserId={authUserId} messages={messages} />
      <TypingInChat typing={typing} />
      <MessageInput className="sticky bottom-0 left-0 px-6 py-4 z-[9999999]"/>
    </div>
  )
}

export default Messages;