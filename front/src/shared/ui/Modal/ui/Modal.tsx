import type { ReactNode } from 'react';
import { useModal } from '../../../hooks/useModal/useModal.tsx';
import { Portal } from '../../Portal/Portal.tsx';
import { Overlay } from '../../Overlay/Overlay.tsx';
import classnames from 'classnames';
import cls from './Modal.module.css'
import { twMerge } from 'tailwind-merge';

type ModalPosition = 'top left' | 'center'
export interface ModalProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  position?: ModalPosition
  fit?: boolean
  transparent?: boolean
}

type WithChildren = {
  children: ReactNode | ((close: () => void) => ReactNode);
}

const positionToMap: Record<ModalPosition, string> = {
  'center': cls.center,
  'top left': classnames(cls.top, cls.left),
}

export const Modal = ({
  className,
  isOpen,
  onClose,
  children,
  position = 'center',
  fit = false,
}: ModalProps & WithChildren) => {
  const { isClosing, closeHandler, isMounted, isShown } = useModal({
    onClose,
    isOpen
  })

  if(!isMounted) return null;
  return (
    <Portal>
      <div className={classnames(
        cls.modal,
        { [cls.opened]: isShown, [cls.isClosing]: isClosing },
        [className])}
      >
        <Overlay onClick={closeHandler} />
        <div
          className={twMerge(classnames(
            cls.content,
            "min-w-[400px] w-[70%] max-w-[1000px]",
            { "w-fit": fit },
            [positionToMap[position]]))}
        >
          { typeof children === 'function' ? children(closeHandler) : children }
        </div>
      </div>
    </Portal>
  )
}