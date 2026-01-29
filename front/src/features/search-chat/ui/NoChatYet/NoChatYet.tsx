import { useGlobalChatsSearch } from '@/features/search-chat/model/hooks/useGlobalChatsSearch.tsx';
import { useLocalChatsSearch } from '@/features/search-chat/model/hooks/useLocalChatsSearch.tsx';
import { memo } from 'react';
import { useChatSearchDebouncedText } from '@/features/search-chat/model/context/useChatSearchDebouncedText.tsx';

export const NoChatYet = memo(() => {
  const { items: globalChats  } = useGlobalChatsSearch()
  const { items: localChats } = useLocalChatsSearch()
  const { debouncedSearchText } = useChatSearchDebouncedText()

  if(!debouncedSearchText || localChats?.length || globalChats?.length) return null;

  return (
    <div className="py-5">
      You don't have any chat yet!'
    </div>
  )
})

NoChatYet.displayName = 'NoChatYet'