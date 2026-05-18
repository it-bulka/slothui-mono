import { Chats } from '@/entities/Chats/ui/Chats';
import { useLocalChatsSearch } from '../../model/hooks/useLocalChatsSearch.tsx';
import { memo } from 'react';

export const LocalChatsSearchResult = memo(() => {
  const { items } = useLocalChatsSearch()

  if(!items.length) return null;

  return (
    <Chats chats={items} />
  )
})

LocalChatsSearchResult.displayName = 'LocalChatsSearchResult'