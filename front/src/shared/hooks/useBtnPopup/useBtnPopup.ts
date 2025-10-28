import { flip, offset, shift, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { useState } from 'react';

export const useBtnPopup = ({ defaultState = false }: {defaultState?: boolean } = {}) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const { x, y, refs, strategy, context } = useFloating({
    placement: 'bottom',
    middleware: [offset(10), flip(), shift()],
    strategy: 'fixed',
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown', // listen to pointerdown instead of click
    bubbles: false,                   // not to duplicate click after closing popup
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  return { x, y, strategy, context, refs, getFloatingProps, getReferenceProps };
}