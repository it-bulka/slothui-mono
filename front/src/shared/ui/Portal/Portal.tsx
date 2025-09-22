import { createPortal } from 'react-dom';
import { type PropsWithChildren,  memo } from 'react';
import { ensurePortalRoot } from './ensurePortalRoot.ts';

interface PortalProps {
  insertTo?: HTMLElement;
}
export const Portal = memo(({ children, insertTo }: PropsWithChildren<PortalProps>) => {
  const elToInsert = insertTo || ensurePortalRoot()
  return createPortal(children, elToInsert)
})