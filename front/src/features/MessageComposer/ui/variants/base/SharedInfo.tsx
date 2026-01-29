import { Typography } from '@/shared/ui';
import ForwardedIcon from '@/shared/assets/images/general/forwarded.svg?react'
export const SharedInfo = () => {
  return (
    <Typography className="mb-2" color="secondary">
      <ForwardedIcon className="w-[24px] h-[24px]" />
    </Typography>
  )
}