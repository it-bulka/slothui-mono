import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChatSearchProvider, SearchChatInput, ChatSearchResult } from '@/features/search-chat';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { Typography } from '@/shared/ui/Typography/Typography';
import { AllChats } from './Chats/AllChats.tsx';
import { useChatSearchDebouncedText } from '@/features/search-chat/model/context/useChatSearchDebouncedText.tsx';

const ChatsPage = memo(() => {
  const user = useAuthUserSelector()
  const { debouncedSearchText } = useChatSearchDebouncedText()

  if (!user) return <Typography>User not authorized</Typography>

  return (
    <>
      <Helmet>
        <title>Chats — SlothUI</title>
        <meta name="description" content="Your conversations on SlothUI." />
      </Helmet>
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
})

ChatsPage.displayName = 'ChatsPage'

const ChatsPageWithProvider = () => {
  return (
    <ChatSearchProvider>
      <ChatsPage />
    </ChatSearchProvider>
  )
}
export default ChatsPageWithProvider
