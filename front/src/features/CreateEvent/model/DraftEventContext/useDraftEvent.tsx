import { useContext } from 'react';
import { DraftEventContext } from './DraftEventContext.tsx';

export const useDraftEvent = () => {
  const ctx = useContext(DraftEventContext);
  if(!ctx) throw new Error('useDraftEvent must be inside DraftEventContext');
  return ctx;
}