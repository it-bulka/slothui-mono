import MoreIcon from '@/shared/assets/images/general/more.svg?react'
import { useLayoutEffect, useRef } from 'react';
import { useBtnPopup } from '@/shared/hooks';
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { FloatingPortal } from '@floating-ui/react';
import type { ReactNode } from 'react';

interface DownloadButtonPops {
  className?: string
  contentWrapperClass?: string,
  moreBtnClass?: string
  content: ReactNode
}
export const MoreButton = ({
  className,
  contentWrapperClass,
  moreBtnClass,
  content
}: DownloadButtonPops) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { refs, x, y, strategy, getReferenceProps, getFloatingProps, context } = useBtnPopup()

  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    if (node) refs.setFloating(node);
  };

  useLayoutEffect(() => {
    if(btnRef.current)  refs.setReference(btnRef.current);
    if(wrapperRef.current)  refs.setFloating(wrapperRef.current);
  }, [refs])

  return (
    <div className={twMerge(classnames('w-fit', [className]))}>
      <button ref={btnRef} {...getReferenceProps()} className={twMerge(classnames("text-white mix-blend-difference px-4", [moreBtnClass]))}>
        <MoreIcon />
      </button>

      {
        context.open && (
          <FloatingPortal>
            <div
              ref={setWrapperRef}
              {...getFloatingProps()}
              style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
              className={twMerge('z-[99999999999999999999999999]', contentWrapperClass)}
            >
              {content}
            </div>
          </FloatingPortal>
        )
      }
    </div>
  )
}