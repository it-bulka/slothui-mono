import { type ReactNode, type ElementType, type MouseEventHandler, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import cls from './MessageWrapper.module.css';

interface MessageWrapperProps {
  children: ReactNode;
  as?: ElementType;
  isAuthor: boolean;
  isFirst?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const MessageWrapper = forwardRef<HTMLElement, MessageWrapperProps>(({
   children,
   as: Tag = 'div',
   isFirst = false,
   isAuthor = false,
   className,
   onClick,
}, ref) => {
  return (
    <Tag
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         ref={ref as any}
         onClick={onClick}
         className={twMerge(classnames(cls.message, {
           [cls.self]: isAuthor,
           [cls.other]: !isAuthor,
           [cls.first]: isFirst,
         }, [className]))}
    >
      {children}
    </Tag>
  );
});

MessageWrapper.displayName = 'MessageWrapper';
