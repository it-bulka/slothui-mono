import type { ReactNode, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import cls from './MessageWrapper.module.css';

interface MessageWrapperProps {
  children: ReactNode;
  as?: ElementType;
  isAuthor: boolean;
  isFirst?: boolean;
  className?: string;
}

export const MessageWrapper = ({
   children,
   as: Tag = 'div',
   isFirst = false,
   isAuthor = false,
   className,
}: MessageWrapperProps) => {
  return (
    <Tag
         className={twMerge(classnames(cls.message, {
           [cls.self]: isAuthor,
           [cls.other]: !isAuthor,
           [cls.first]: isFirst,
         }, [className]))}
    >
      {children}
    </Tag>
  );
};