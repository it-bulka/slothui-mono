import { ChatSearchProvider, SearchChatInput, ChatSearchResult } from '@/features';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { Typography } from '@/shared/ui';
import { AllChats } from './Chats/AllChats.tsx';
import { useChatSearchDebouncedText } from '@/features/search-chat/model/context/useChatSearchDebouncedText.tsx';

const ChatsPage = () => {
  const user = useAuthUserSelector()
  const { debouncedSearchText } = useChatSearchDebouncedText()

  if (!user) return <Typography>User not authorized</Typography>

  return (
    <>
      <div className="px-main py-main">
        <SearchChatInput />
      </div>

      {debouncedSearchText ? (
        <ChatSearchResult className="px-main py-main" />
      ) : (
        <AllChats />
      )}
    </>
  )
}

const ChatsPageWithProvider = () => {
  return (
    <ChatSearchProvider>
      <ChatsPage />
    </ChatSearchProvider>
  )
}
export default ChatsPageWithProvider