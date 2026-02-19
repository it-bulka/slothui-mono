import { Modal } from '@/shared/ui';
import { ConfirmDeleteAccountButton } from '../ConfirmDeleteAccount/ConfirmDeleteAccount.tsx';

interface DeleteAccountModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ConfirmDeleteAccountButton onClose={onClose} />
    </Modal>
  )
}