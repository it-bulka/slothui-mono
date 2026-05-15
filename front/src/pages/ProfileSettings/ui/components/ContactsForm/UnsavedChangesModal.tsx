import { Modal, ModalCard, Button } from '@/shared/ui';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onStay: () => void;
  onLeave: () => void;
}

export const UnsavedChangesModal = ({ isOpen, onStay, onLeave }: UnsavedChangesModalProps) => (
  <Modal isOpen={isOpen} onClose={onStay} fit>
    <ModalCard title="Unsaved changes">
      <p className="text-sm text-gray-600 mb-4">
        You have unsaved contact changes. Leave without saving?
      </p>
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" type="button" onClick={onStay}>
          Stay
        </Button>
        <Button type="button" onClick={onLeave}>
          Leave
        </Button>
      </div>
    </ModalCard>
  </Modal>
);
