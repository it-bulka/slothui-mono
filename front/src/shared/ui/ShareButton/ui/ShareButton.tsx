import { ActionButton } from '../../ActionButton';
import ShareSvg from '../../../assets/images/post/share.svg?react'
import type { PropsWithChildren } from 'react';

interface SharePostProps {
  onClick: () => void;
  className?: string;
}
export const ShareButton = ({ onClick, children, className }: PropsWithChildren<SharePostProps>) => {
  return (
    <ActionButton Icon={ShareSvg} onClick={onClick} className={className} aria-label="Share">
      {children}
    </ActionButton>
  )
}