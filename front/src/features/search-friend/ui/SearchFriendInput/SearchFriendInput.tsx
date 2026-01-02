import { SearchBar } from '@/shared/ui';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

export const SearchFriendInput = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  const handleOnChange = useCallback((val: string) => {
    setSearch(val);
    debouncedSetSearch(val)
  }, [setSearch, debouncedSetSearch]);

  useEffect(() => {

  }, [debouncedSearch]);

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