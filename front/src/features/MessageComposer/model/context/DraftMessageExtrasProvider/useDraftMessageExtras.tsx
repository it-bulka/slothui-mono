import { useContext } from 'react';
import { DraftMessageExtrasContext } from './DraftMessageExtrasContext.tsx';

export const useDraftMessageExtras = () => {
  const context = useContext(DraftMessageExtrasContext);
  if (!context) throw new Error('useDraftMessageExtras must be used inside DraftMessageExtrasProvider');
  return context;
};