import { SearchBar } from '@/shared/ui';
import { useChatSearchDebouncedText } from '@/features/search-chat/model/context/useChatSearchDebouncedText.tsx';
import { useState, useCallback } from 'react';

export const SearchChatInput = ({ className }: { className?: string }) => {
  const { debouncedSetSearch } = useChatSearchDebouncedText();
  const [search, setSearch] = useState('');

  const handleOnChange = useCallback((val: string) => {
    setSearch(val);
    debouncedSetSearch(val)
  }, [setSearch, debouncedSetSearch]);

  return (
    <SearchBar
      placeholder="Search chats..."
      value={search}
      onChange={handleOnChange}
      className={className}
      name="searchChatInput"
    />
  )
}