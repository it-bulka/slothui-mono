import { useLayoutEffect, useRef } from 'react';
import { type UseBtnPopupOptions, useBtnPopup } from '../useBtnPopup/useBtnPopup.ts';

type PopupProps = UseBtnPopupOptions

export const usePopup = <T extends HTMLElement, K extends HTMLElement,>(props: PopupProps = {}) => {
  const anchorRef = useRef<T>(null)
  const popupWrapperRef = useRef<K>(null)
  const { refs, x, y, strategy, getReferenceProps, getFloatingProps, context, ...rest } = useBtnPopup(props)

  const setPopupWrapperRef = (node: K | null) => {
    popupWrapperRef.current = node;
    if (node) refs.setFloating(node);
  };

  useLayoutEffect(() => {
    if(anchorRef.current)  refs.setReference(anchorRef.current);
    if(popupWrapperRef.current)  refs.setFloating(popupWrapperRef.current);
  }, [refs])

  return {
    anchorRef,
    setPopupWrapperRef,
    x, y, strategy, getReferenceProps, getFloatingProps, context,
    ...rest
  }
}