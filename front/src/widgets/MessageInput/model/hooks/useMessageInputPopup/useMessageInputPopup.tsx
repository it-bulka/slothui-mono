import { usePopup } from '@/shared/hooks';
import { useDraftMessageExtras } from '@/features/MessageComposer';
import { useEffect, useMemo } from 'react';

export const useMessageInputPopup = () => {
  const {
    anchorRef,
    context,
    setPopupWrapperRef,
    getFloatingProps,
    strategy, y, x, getReferenceProps,
    open, close
  } = usePopup<HTMLDivElement, HTMLDivElement>({ sameWidth: true, trigger: 'manual' });

  const { hasDraftExtras } = useDraftMessageExtras()

  useEffect(() => {
    if(hasDraftExtras) {
      open()
    } else {
      close()
    }
  }, [close, hasDraftExtras, open])

  const floatingStyle = useMemo(
    () => ({
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
    }),
    [strategy, x, y]
  )

  return {
    floatingStyle,
    anchorRef,
    context,
    setPopupWrapperRef,
    getFloatingProps,
    getReferenceProps
  }
}