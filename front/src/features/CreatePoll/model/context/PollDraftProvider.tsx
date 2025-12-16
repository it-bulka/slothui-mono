import { type ReactNode, useCallback } from 'react';
import { PollDraftContext } from './PollDraftContext.tsx';
import type { PollDraft } from '../types/poll.types.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';

interface PollDraftProviderProps {
  children: ReactNode,
  onPollCreate: (poll: PollDraft) => void
}

export const PollDraftProvider = ({
  children,
  onPollCreate
}: PollDraftProviderProps) => {
  const { isOpen, open, close } = useModalControl();

  const handleCreatePoll = useCallback((poll: PollDraft) => {
    onPollCreate(poll);
    close()
  }, [onPollCreate, close]);
  return (
    <PollDraftContext.Provider value={{ handleCreatePoll, isOpen, open, close }}>
      {children}
    </PollDraftContext.Provider>
  )
}