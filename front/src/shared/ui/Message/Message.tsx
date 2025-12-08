import { type PropsWithChildren, memo } from 'react';
import cls from './Message.module.css'
import classnames from 'classnames';
import { Typography, TypographyTypes } from '@/shared/ui';

export interface MessageProps {
  isFirst?: boolean;
  isAuthor: boolean;
  time: string;
}
export const Message = memo(({
  children,
  isFirst = false,
  isAuthor = false,
  time
}: PropsWithChildren<MessageProps>) => {
  return (
    <div className={classnames(cls.message, {
      [cls.self]: isAuthor,
      [cls.other]: !isAuthor,
      [cls.first]: isFirst
    })}>
      <p>{children}</p>
      <Typography type={TypographyTypes.P_SM} className={"text-right text-xs"}>{time}</Typography>
    </div>
  )
})