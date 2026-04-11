import type { PropsWithChildren, ReactNode } from 'react';

interface OverlayBadgeProps {
  content: ReactNode;
  show?: boolean;
}

export const OverlayBadge = ({ children, content, show = true }: PropsWithChildren<OverlayBadgeProps>) => {
  return (
    <div className="relative inline-flex">
      {children}

      {show && (
        <span className="pointer-events-none absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-blue-b1 text-white text-[10px] font-bold leading-none">
          {content}
        </span>
      )}
    </div>
  );
};
