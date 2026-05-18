import { Modal, ModalCard } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button/Button';

interface DeletePostModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeletePostModal = ({ isOpen, onConfirm, onCancel }: DeletePostModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} fit>
      <ModalCard title="Delete post">
        <p className="text-gray-g1 mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
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
