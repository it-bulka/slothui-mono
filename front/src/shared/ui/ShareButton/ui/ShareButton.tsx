import { ActionButton } from '../../ActionButton';
import ShareSvg from '../../../assets/images/post/share.svg?react'
import type { PropsWithChildren } from 'react';

interface SharePostProps {
  onClick: () => void;
}
export const ShareButton = ({ onClick, children }: PropsWithChildren<SharePostProps>) => {
  return (
    <ActionButton Icon={ShareSvg} onClick={onClick}>
      {children}
    </ActionButton>
  )
}