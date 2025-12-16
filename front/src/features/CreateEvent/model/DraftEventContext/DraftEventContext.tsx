import { createContext } from 'react';
import type { DraftEvent } from '../types/event.type.ts';

interface IDraftEventContext {
  handleCreateEvent: (event: DraftEvent) => void;
}

export const DraftEventContext = createContext<IDraftEventContext | undefined>(undefined)