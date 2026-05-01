import { createContext } from 'react';
import type { ServicesFacade } from '../ServicesFacade/ServicesFacade.ts';

export interface CtxProps {
  services: ServicesFacade;
  updateToken: (token: string) => void;
}
export const Ctx = createContext<CtxProps | null>(null);
