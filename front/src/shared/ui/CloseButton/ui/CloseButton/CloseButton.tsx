import { Button } from '@/shared/ui';
import classnames from 'classnames';
import type { MouseEvent } from 'react';

interface CloseButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
  className?: string
}
export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <Button
      variant="icon"
      onClick={onClick}
      className={classnames("py-2 px-4 font-bold block", [className])}
    >
      x
    </Button>
  )
}