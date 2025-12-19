import { useContext } from 'react';
import { DraftMessageTextContext } from './DraftMessageTextContext.tsx';

export const useDraftMessageText = () => {
  const context = useContext(DraftMessageTextContext);
  if (!context) throw new Error('useDraftMessageText must be used inside DraftMessageTextProvider');
  return context;
};