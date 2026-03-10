import type { PropsWithChildren } from 'react';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { Button } from '@/shared/ui';
import { PollResultModal } from './PollResultModal.tsx';

export const PollResultWrapper = ({
  children,
  pollId
}: PropsWithChildren<{ pollId: string }>) => {

  const { isOpen, close, open } = useModalControl(false)

  return (
    <div className="relative">

      {children}

      <Button
        className="w-full mt-3 mx-auto"
        onClick={open}
        variant="link"
      >
        Result Details
      </Button>

      <PollResultModal
        pollId={pollId}
        isOpen={isOpen}
        onClose={close}
      />
    </div>
  )
}