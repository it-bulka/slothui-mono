import { ActionButton } from '@/shared/ui';
import SmileSvg from '@/shared/assets/images/message/smile.svg?react'
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { memo, useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useBtnPopup } from '@/shared/hooks';
import { FloatingPortal } from '@floating-ui/react';

export const EmojiAction = memo(({onEmojiClick, isEmojiShown = false }: {onEmojiClick?: (emojiData: EmojiClickData) => void, isEmojiShown?: boolean}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { refs, x, y, strategy, getReferenceProps, getFloatingProps, context } = useBtnPopup({ defaultState: isEmojiShown })

  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    if (node) refs.setFloating(node);
  };

  useLayoutEffect(() => {
    if(btnRef.current)  refs.setReference(btnRef.current);
    if(wrapperRef.current)  refs.setFloating(wrapperRef.current);
  }, [refs])

  return  (
    <>
      <ActionButton
        ref={btnRef}
        variant="secondary"
        Icon={SmileSvg}
        {...getReferenceProps()}
      />
      {
        context.open && (
          <FloatingPortal>
            <div ref={setWrapperRef} {...getFloatingProps()} style={{ position: strategy, top: y ?? 0, left: x ?? 0 }} className="z-[999999999999999]">
              <EmojiPicker onEmojiClick={onEmojiClick}/>
            </div>
          </FloatingPortal>
        )
      }
    </>
  )
})

EmojiAction.displayName = 'EmojiAction';