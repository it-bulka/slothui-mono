import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  autoUpdate,
  size
} from '@floating-ui/react';
import { useState } from 'react';

export interface UseBtnPopupOptions {
  defaultState?: boolean
  placement?: 'bottom' | 'top' | 'left' | 'right'
  strategy?: 'fixed' | 'absolute'
  sameWidth?: boolean
  trigger?: 'click' | 'manual';
}

export const useBtnPopup = ({
  defaultState = false,
  placement = 'bottom',
  strategy = 'fixed',
  sameWidth = false,
  trigger = 'click',
}: UseBtnPopupOptions = {}) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const middleware = [
    offset(10),
    flip(),
    shift(),
    ...(sameWidth
      ? [
        size({
          apply({ rects, elements }) {
            elements.floating.style.width =
              `${rects.reference.width}px`;
          },
        }),
      ]
      : []),
  ];

  const { x, y, refs, strategy: st, context } = useFloating({
    placement,
    middleware,
    strategy,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate
  });


  const click = useClick(context, {
    enabled: trigger === 'click',
  });
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown', // listen to pointerdown instead of click
    bubbles: false,                   // not to duplicate click after closing popup
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  return {
    x,
    y,
    strategy: st,
    context,
    refs,
    getFloatingProps,
    getReferenceProps,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(v => !v),
  };
}