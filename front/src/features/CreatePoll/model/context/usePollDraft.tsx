import { useContext } from 'react';
import { PollDraftContext } from './PollDraftContext.tsx';

export const usePollDraft = () => {
  const ctx = useContext(PollDraftContext);
  if(!ctx) throw new Error('usePollDraft must be inside PollDraftContext');
  return ctx;
}