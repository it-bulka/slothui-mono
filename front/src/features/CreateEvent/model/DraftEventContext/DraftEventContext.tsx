import { createContext } from 'react';
import type { DraftEvent } from '../types/event.type.ts';

interface IDraftEventContext {
  handleCreateEvent: (event: DraftEvent) => Promise<{ ok: boolean; error?: string }>;
}

export const DraftEventContext = createContext<IDraftEventContext | undefined>(undefined)
