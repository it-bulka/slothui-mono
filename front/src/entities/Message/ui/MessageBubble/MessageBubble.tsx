import { type ReactNode } from "react";
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import cls from './MessageBubble.module.css';

export interface MessageBubbleProps {
  children: ReactNode;
  isAuthor: boolean;
  maxWidth?: boolean;
}

export const MessageBubble = ({
  children,
  isAuthor,
  maxWidth
}: MessageBubbleProps) => {
  return (
    <div
      className={twMerge(classnames(cls.message, {
        [cls.self]: isAuthor,
        [cls.other]: !isAuthor,
        [cls.max]: !!maxWidth
      }))}
    >
      {children}
    </div>
  );
};