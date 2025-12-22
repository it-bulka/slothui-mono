import { ChatSearchProvider, SearchChatInput, ChatSearchResult } from '@/features';

const ChatsPage = () => {
  return (
    <ChatSearchProvider>
      <>
        <div className="px-main py-main">
          <SearchChatInput />
        </div>
        <ChatSearchResult className="px-main py-main" />
      </>
    </ChatSearchProvider>
  )
}

export default ChatsPage