import { ChatSearchProvider, SearchChatInput, ChatSearchResult } from '@/features';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { Typography } from '@/shared/ui';
import { AllChats } from './Chats/AllChats.tsx';

const ChatsPage = () => {
  const user = useAuthUserSelector()
  if (!user) return <Typography>User not authorized</Typography>

  return (
    <>
      <ChatSearchProvider>
        <>
          <div className="px-main py-main">
            <SearchChatInput />
          </div>
          <ChatSearchResult className="px-main py-main" />
        </>
      </ChatSearchProvider>
      <AllChats userId={user.id}/>
    </>
  )
}

export default ChatsPage