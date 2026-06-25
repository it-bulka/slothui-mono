import { memo, type PropsWithChildren } from 'react';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { Button } from '@/shared/ui/Button/Button';
import { PollResultModal } from './PollResultModal.tsx';

export const PollResultWrapper = memo(({
  children,
  pollId
}: PropsWithChildren<{ pollId: string }>) => {

  const { isOpen, close, open } = useModalControl(false)

  return (
    <div className="relative">

      {children}

      <Button
        className="rounded-full w-fit mx-auto mt-4"
        onClick={open}
        variant="soft"
        size="md"
      >
        View Results →
      </Button>

      <PollResultModal
        pollId={pollId}
        isOpen={isOpen}
        onClose={close}
      />
    </div>
  )
})

PollResultWrapper.displayName = 'PollResultWrapper'