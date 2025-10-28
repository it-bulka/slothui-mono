import { ActionButton } from '@/shared/ui';
import SmileSvg from '@/shared/assets/images/message/smile.svg?react'
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { useState, memo, useLayoutEffect } from 'react';
import { useFloating, useInteractions, useDismiss, offset, flip, shift, useClick } from '@floating-ui/react';
import { useRef } from 'react';

export const EmojiAction = memo(({onEmojiClick, isEmojiShown = false }: {onEmojiClick: (emojiData: EmojiClickData) => void, isEmojiShown?: boolean}) => {
  const [isOpen, setIsOpen] = useState(isEmojiShown);
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

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

  useLayoutEffect(() => {
    if(btnRef.current)  refs.setReference(btnRef.current);
    if(wrapperRef.current)  refs.setFloating(wrapperRef.current);
  }, [refs])

  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    if (node) refs.setFloating(node);
  };

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
          <div ref={setWrapperRef} {...getFloatingProps()} style={{ position: strategy, top: y ?? 0, left: x ?? 0 }} className="">
            <EmojiPicker onEmojiClick={onEmojiClick}/>
          </div>
        )
      }
    </>
  )
})

EmojiAction.displayName = 'EmojiAction';