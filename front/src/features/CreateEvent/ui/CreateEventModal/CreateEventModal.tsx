import { EventCreateForm } from '../CreateEventForm/CreateEventForm.tsx';
import { memo, useCallback } from 'react';
import { Modal, ModalCard } from '@/shared/ui';
import { useDraftEvent } from '../../model/DraftEventContext/useDraftEvent.tsx';
import type { DraftEvent } from '../../model/types/event.type.ts';
import { toast } from 'react-toastify';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal = memo(({ isOpen, onClose }: CreateEventModalProps) => {
  const { handleCreateEvent } = useDraftEvent()

  const onCreateEvent = useCallback(async (event: DraftEvent) => {
    const result = await handleCreateEvent(event)
    if (result.ok) {
      onClose()
    } else {
      toast.error(result.error ?? 'Failed to create event. Please try again.')
    }
  }, [onClose, handleCreateEvent])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalCard title="Create event" onClose={onClose}>
        <EventCreateForm onCreateEvent={onCreateEvent} />
      </ModalCard>
    </Modal>
  )
})

CreateEventModal.displayName = 'CreateEventModal'
