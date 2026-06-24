import { CtaButton } from '@/shared/ui/CtaButton';
import EventSvg from '@/shared/assets/images/actions/event.svg?react'
import { CreateEventModal } from '../CreateEventModal/CreateEventModal.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { memo } from 'react';

export const CreateEventButton = memo(({ title }: { title?: string }) => {
  const { isOpen, close, open } = useModalControl()

  return (
    <>
      <CtaButton Icon={EventSvg} onClick={open}>{title || 'Event'}</CtaButton>
      <CreateEventModal isOpen={isOpen} onClose={close}/>
    </>
  )
})

CreateEventButton.displayName = 'CreateEventButton'