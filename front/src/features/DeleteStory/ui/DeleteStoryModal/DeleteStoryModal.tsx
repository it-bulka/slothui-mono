import { Modal, ModalCard } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button/Button';

interface DeleteStoryModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteStoryModal = ({ isOpen, onConfirm, onCancel }: DeleteStoryModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} fit>
      <ModalCard title="Delete story">
        <p className="text-gray-g1 mb-6">
          Are you sure you want to delete this story? This action cannot be undone.
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
