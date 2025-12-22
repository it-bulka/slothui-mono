import { createContext } from 'react';

interface ChatSearchContextProps {
  debouncedSearchText: string;
  debouncedSetSearch: (text: string) => void;
}

export const ChatSearchContext = createContext<ChatSearchContextProps | null>(null);
