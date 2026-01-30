import  { type PropsWithChildren, memo } from 'react';
import { twMerge } from 'tailwind-merge';

export const ToolbarWrapper = memo(({ children, className }: PropsWithChildren<{ className?: string}>) => {
  return (
    <div className={twMerge(`border-style-b px-main py-5 relative`, className)}>
      {children}
    </div>
  )
})