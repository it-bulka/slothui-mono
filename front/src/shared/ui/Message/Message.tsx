import { type PropsWithChildren, memo } from 'react';
import cls from './Message.module.css'
import classnames from 'classnames';
import { Typography, TypographyTypes } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';

export interface MessageProps {
  isFirst?: boolean;
  isAuthor: boolean;
  time: string;
  maxWidth?: boolean;
}
export const Message = memo(({
  children,
  isFirst = false,
  isAuthor = false,
  time,
  maxWidth
}: PropsWithChildren<MessageProps>) => {
  console.log('Message', {isFirst, isAuthor})
  return (
    <div className={twMerge(classnames(cls.message, {
      [cls.self]: isAuthor,
      [cls.other]: !isAuthor,
      [cls.first]: isFirst,
      [cls.max]: !!maxWidth
    }))}>
      <p>{children}</p>
      <Typography type={TypographyTypes.P_SM} className={"text-right text-xs"}>{time}</Typography>
    </div>
  )
})