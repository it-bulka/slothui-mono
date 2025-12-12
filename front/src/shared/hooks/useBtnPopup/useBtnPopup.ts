import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  autoUpdate
} from '@floating-ui/react';
import { useState } from 'react';

interface UseFloatingOptions {
  defaultState?: boolean
  placement?: 'bottom' | 'top' | 'left' | 'right'
  strategy?: 'fixed' | 'absolute'
}

export const useBtnPopup = ({
  defaultState = false,
  placement = 'bottom',
  strategy = 'fixed',
}: UseFloatingOptions = {}) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const { x, y, refs, strategy: st, context } = useFloating({
    placement,
    middleware: [offset(10), flip(), shift()],
    strategy,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown', // listen to pointerdown instead of click
    bubbles: false,                   // not to duplicate click after closing popup
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  return { x, y, strategy: st, context, refs, getFloatingProps, getReferenceProps };
}