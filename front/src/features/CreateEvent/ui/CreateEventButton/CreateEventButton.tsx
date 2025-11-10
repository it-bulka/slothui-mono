import { ActionButton } from '@/shared/ui';
import EventSvg from '@/shared/assets/images/actions/event.svg?react'
import { CreateEventModal } from '../CreateEventModal/CreateEventModal.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { memo } from 'react';

export const CreateEventButton = memo(() => {
  const { isOpen, close, open } = useModalControl()

  return (
    <>
      <ActionButton Icon={EventSvg} column onClick={open}>Event</ActionButton>
      <CreateEventModal isOpen={isOpen} onClose={close}/>
    </>
  )
})

CreateEventButton.displayName = 'CreateEventButton'