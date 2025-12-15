import { useContext } from 'react';
import { DraftMessageContext } from './DraftMessageContext.tsx';

export const useDraftMessage = () => {
  const context = useContext(DraftMessageContext);
  if (!context) throw new Error('useMessageInput must be used inside DraftMessageProvider');
  return context;
};