import { useState, type ReactNode, useMemo } from 'react';
import { ChatSearchContext } from './ChatSearchContext.tsx';
import { debounce } from 'lodash';

export const ChatSearchProvider = ({ children }: { children: ReactNode }) => {
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchText(value);
      }, 300),
    []
  );

  return (
    <ChatSearchContext.Provider value={{
      debouncedSearchText,
      debouncedSetSearch,
    }}>
      {children}
    </ChatSearchContext.Provider>
  );
};

