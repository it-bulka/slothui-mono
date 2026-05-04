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
    <div className={`relative h-full min-h-0 ${className}`}>
      <div
        ref={ref}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scrollbar-hide"
      >
        {children}
      </div>

      {showFade && (
        <div
          className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-white))',
          }}
        />
      )}
    </div>
  );
});

ScrollableBlock.displayName = "ScrollableBlock";