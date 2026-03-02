import { Typography, TypographyTypes } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import cls from './MessageTime.module.css'

interface MessageTimeProps {
  time: string;
  className?: string;
  /** if absolute — set time above content, static — in bubble */
  position?: 'static' | 'absolute';
  /** For the background or time theme in order to be correct visible above the picture */
  variant?: 'default' | 'onMedia';
}

export const MessageTime = ({
  time,
  className,
  position = 'static',
  variant = 'default'
}: MessageTimeProps) => {
  return (
    <Typography
      type={TypographyTypes.P_SM}
      className={
        twMerge(classnames('text-xs text-right opacity-70',  [cls[variant], cls[position], className]))
      }
    >
      {time}
    </Typography>
  )
}