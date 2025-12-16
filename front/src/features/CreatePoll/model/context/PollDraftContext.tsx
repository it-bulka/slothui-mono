import { createContext } from 'react';
import type { PollDraft } from '../types/poll.types.tsx';

interface IPollDraftContext {
  handleCreatePoll: (poll: PollDraft) => void;
  isOpen: boolean
  close: () => void
  open: () => void
}

export const PollDraftContext = createContext<IPollDraftContext | undefined>(undefined);