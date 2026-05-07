import { SearchBar } from '@/shared/ui';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

export const SearchFriendInput = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState('');

  const debouncedSetSearch = useMemo(
    () => debounce((_value: string) => {}, 300),
    []
  );

  const handleOnChange = useCallback((val: string) => {
    setSearch(val);
    debouncedSetSearch(val)
  }, [setSearch, debouncedSetSearch]);

  useEffect(() => {
    return () => debouncedSetSearch.cancel();
  }, [debouncedSetSearch]);

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