import { type ReactNode } from "react";
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import cls from './MessageBubble.module.css';

export interface MessageBubbleProps {
  children: ReactNode;
  isAuthor: boolean;
  maxWidth?: boolean;
  overflowVisible?: boolean;
}

export const MessageBubble = ({
  children,
  isAuthor,
  maxWidth,
  overflowVisible,
}: MessageBubbleProps) => {
  return (
    <div
      className={twMerge(classnames(cls.message, {
        [cls.self]: isAuthor,
        [cls.other]: !isAuthor,
        [cls.max]: !!maxWidth,
        [cls.editing]: overflowVisible,
      }, ['px-6']))}
    >
      {children}
    </div>
  );
};