import { type ReactNode, useRef, useState, useEffect, memo } from 'react';

interface ScrollableBlockProps {
  children: ReactNode;
  className?: string;
}

export const ScrollableBlock = memo(({ children, className }: ScrollableBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  const handleScroll = () => {
    if (!ref.current) return;
    const el = ref.current;
    setShowFade(el.scrollTop + el.clientHeight < el.scrollHeight);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className={`h-full overflow-y-auto scrollbar-hide relative ${className}`}
    >
      {children}
      {showFade && (
        <div className="absolute bottom-0 left-0 w-full h-10 pointer-events-none bg-gradient-to-b from-transparent to-white" />
      )}
    </div>
  );
});

ScrollableBlock.displayName = "ScrollableBlock";