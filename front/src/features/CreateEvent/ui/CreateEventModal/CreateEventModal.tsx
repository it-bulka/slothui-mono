import { EventCreateForm } from '../CreateEventForm/CreateEventForm.tsx';
import { memo, useCallback } from 'react';
import { Modal, ModalCard } from '@/shared/ui';
import { useDraftEvent } from '../../model/DraftEventContext/useDraftEvent.tsx';
import type { DraftEvent } from '../../model/types/event.type.ts';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CreateEventModal = memo(({ isOpen, onClose }: CreateEventModalProps) => {
  const { handleCreateEvent } = useDraftEvent()

  const onCreateEvent = useCallback((event: DraftEvent) => {
    handleCreateEvent(event)
    onClose()
  }, [onClose, handleCreateEvent])

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalCard title="Create event" onClose={onClose}>
        <EventCreateForm onCreateEvent={(e) => {
          onCreateEvent?.(e)
          close()
        }}/>
      </ModalCard>
    </Modal>
  )
})

CreateEventModal.displayName = 'CreateEventModal'