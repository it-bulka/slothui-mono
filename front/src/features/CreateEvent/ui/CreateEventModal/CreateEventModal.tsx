import { EventCreateForm } from '../CreateEventForm/CreateEventForm.tsx';
import { memo } from 'react';
import { Modal, ModalCard } from '@/shared/ui';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CreateEventModal = memo(({ isOpen, onClose }: CreateEventModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalCard title="Create event" onClose={onClose}>
        <EventCreateForm />
      </ModalCard>
    </Modal>
  )
})

CreateEventModal.displayName = 'CreateEventModal'