import { Button } from '@/shared/ui';
import { DeleteAccountModal } from '../DeleteAccountModal/DeleteAccountModal.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { memo } from 'react';

export const DeleteAccountButton = memo(() => {
  const { isOpen, close, open } = useModalControl()
  return (
    <>
      <Button className="w-full" variant="secondary" onClick={open}>Delete account</Button>
      <DeleteAccountModal isOpen={isOpen} onClose={close} />
    </>
  )
})

DeleteAccountButton.displayName = 'DeleteAccountButton'