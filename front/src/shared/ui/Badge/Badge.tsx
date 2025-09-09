import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  className?: string;
}

export const Badge = ({ children, className }: PropsWithChildren<BadgeProps>) => {
  return (
    <span className={twMerge("block py-1 px-[10px] text-blue-b1 bg-light-l1 border border-blue-b2 rounded-full", className)}>
      {children}
    </span>
  )
}