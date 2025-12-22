import { useContext } from 'react';
import { ChatSearchContext } from './ChatSearchContext.tsx';

export const useChatSearchDebouncedText = () => {
  const context = useContext(ChatSearchContext);
  if (!context) throw new Error('useChatSearch must be used within ChatSearchProvider');
  return context;
};