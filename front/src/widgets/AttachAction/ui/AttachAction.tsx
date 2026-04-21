import { ActionButton } from '@/shared/ui';
import AttachSvg from '@/shared/assets/images/message/attach.svg?react'
import { useBtnPopup } from '@/shared/hooks';
import { memo, useLayoutEffect, useRef } from 'react';
import { AttachActionsPopup, type AttachActionKey } from './ActionPopup.tsx';

interface Props {
  actions?: AttachActionKey[]
}

const AttachActionBase = ({ actions }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { refs, x, y, strategy, getReferenceProps, getFloatingProps, context, close } = useBtnPopup({ defaultState: false })

  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    if (node) refs.setFloating(node);
  };

  useLayoutEffect(() => {
    if(btnRef.current)  refs.setReference(btnRef.current);
    if(wrapperRef.current)  refs.setFloating(wrapperRef.current);
  }, [refs])
  return (
    <>
      <ActionButton ref={btnRef} variant="secondary" Icon={AttachSvg} {...getReferenceProps()}/>
      {
        context.open && (
          <div
            ref={setWrapperRef}
            {...getFloatingProps()}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            className="z-actions-popup"
          >
            <AttachActionsPopup onBtnClick={close} actions={actions}/>
          </div>
        )
      }
    </>
  )
}

export const AttachAction = memo(AttachActionBase)
AttachAction.displayName = 'AttachAction'