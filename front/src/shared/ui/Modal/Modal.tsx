import type { ReactNode } from 'react';
import { useModal } from '../../hooks/useModal/useModal.tsx';
import { Portal } from '../Portal/Portal.tsx';
import { Overlay } from '../Overlay/Overlay.tsx';
import classnames from 'classnames';
import cls from './Modal.module.css'

type ModalPosition = 'top left' | 'center'
export interface ModalProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  position?: ModalPosition
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
}: ModalProps & WithChildren) => {
  const { isClosing, closeHandler } = useModal({
    onClose,
    isOpen
  })

  return (
    <Portal>
      <div className={classnames(
        cls.modal,
        { [cls.opened]: isOpen, [cls.isClosing]: isClosing },
        [className])}
      >
        <Overlay onClick={closeHandler} />
        <div className={classnames(cls.content, {}, [positionToMap[position]])}>
          {typeof children === 'function' ? children(closeHandler) : children}
        </div>
      </div>
    </Portal>
  )
}