import { createContext, useContext } from 'react';

export type SidebarState = 'none' | 'left' | 'right';

export interface SidebarCtx {
  sidebar: SidebarState;
  openLeft: () => void;
  openRight: () => void;
  close: () => void;
}

export const SidebarContext = createContext<SidebarCtx | null>(null);

export const useSidebarContext = (): SidebarCtx => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebarContext must be used inside MainLayout');
  return ctx;
};
