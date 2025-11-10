import { ActionButton } from '@/shared/ui';
import PollSvg from '@/shared/assets/images/actions/poll.svg?react'
import { memo } from 'react';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { CreatePollModal } from '../CreatePollModal/CreatePollModal.tsx';

export const CreatePollButton = memo(() => {
  const { isOpen, close, open } = useModalControl()
  return (
    <>
      <ActionButton Icon={PollSvg} column onClick={open}>Poll</ActionButton>
      <CreatePollModal isOpen={isOpen} onClose={close} />
    </>
  )
})

CreatePollButton.displayName = 'CreatePollButton';