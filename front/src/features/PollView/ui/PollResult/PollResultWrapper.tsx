import { Button } from '@/shared/ui';
import type { PollFullResult } from '../../model/types';
import { PollResultWithWrapperWindow } from './PollResultWithWrapperWindow.tsx';
import type { PropsWithChildren } from 'react';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';

export const PollResultWrapper = ({ children, options, anonymous }: PropsWithChildren<PollFullResult>) => {
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
      <PollResultWithWrapperWindow anonymous={anonymous} options={options} onClose={close} isOpen={isOpen} />
    </div>
  )
}