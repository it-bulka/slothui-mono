import { Modal, ModalCard, Button } from '@/shared/ui';

interface DeleteChatModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteChatModal = ({ isOpen, onConfirm, onCancel }: DeleteChatModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} fit>
      <ModalCard title="Delete chat">
        <p className="text-gray-g1 mb-6">
          Are you sure you want to delete this chat? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} className="!bg-red-500">
            Delete
          </Button>
        </div>
      </ModalCard>
    </Modal>
  );
};
