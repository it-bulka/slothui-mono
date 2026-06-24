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
import { useState, useEffect, useCallback } from 'react';

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

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, [isOpen]);

  const click = useClick(context, {
    enabled: trigger === 'click',
  });
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown',
    bubbles: false,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen(v => !v), []);

  return {
    x,
    y,
    strategy: st,
    context,
    refs,
    getFloatingProps,
    getReferenceProps,
    open,
    close,
    toggle,
  };
}