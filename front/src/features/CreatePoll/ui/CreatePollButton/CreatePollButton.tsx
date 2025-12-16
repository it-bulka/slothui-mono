import { ActionButton } from '@/shared/ui';
import PollSvg from '@/shared/assets/images/actions/poll.svg?react'
import { memo } from 'react';
import { CreatePollModal } from '../CreatePollModal/CreatePollModal.tsx';
import { usePollDraft } from '@/features/CreatePoll/model/context/usePollDraft.tsx';

export const CreatePollButton = memo(() => {
  const { isOpen, close, open, handleCreatePoll } = usePollDraft()
  return (
    <>
      <ActionButton Icon={PollSvg} column onClick={open}>Poll</ActionButton>
      <CreatePollModal isOpen={isOpen} onClose={close} onCreatePoll={ handleCreatePoll }/>
    </>
  )
})

CreatePollButton.displayName = 'CreatePollButton';