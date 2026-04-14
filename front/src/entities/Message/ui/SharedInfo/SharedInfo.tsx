import { Typography } from '@/shared/ui';
import ForwardedIcon from '@/shared/assets/images/general/forwarded.svg?react'
import type { PropsWithChildren } from 'react';
export const SharedInfo = ({children}: PropsWithChildren) => {
  return (
    <Typography className="mb-2 flex gap-2" color="secondary">
      <ForwardedIcon className="w-[24px] h-[24px]" />
      {children && <span>{children}</span>}
    </Typography>
  )
}