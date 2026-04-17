import { DraftEventContext } from './DraftEventContext.tsx';
import { type ReactNode } from 'react';
import type { DraftEvent } from '@/features/CreateEvent/model/types/event.type.ts';

export const DraftEventProvider = ({
  children, onEventCreate
}: { children: ReactNode, onEventCreate: (event: DraftEvent) => Promise<{ ok: boolean; error?: string }> }) => {
  return (
    <DraftEventContext.Provider value={{ handleCreateEvent: onEventCreate }}>
      {children}
    </DraftEventContext.Provider>
  )
}
