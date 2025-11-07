import { useState } from 'react';

export const useModalControl = (defaultState: boolean = false, onClose?: () => void) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const close = () => {
    setIsOpen(false)
    onClose?.()
  };

  const open = () => setIsOpen(true);

  return { isOpen, close, open };
}