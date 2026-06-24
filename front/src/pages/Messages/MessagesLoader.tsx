import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const MessagesLoader = memo(() => {
  return (
    <div className="absolute inset-0 flex flex-col">

      {/* CurrentChatHeader skeleton */}
      <div className="shrink-0 border-style-b px-6 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3 min-w-0 grow">
          <Skeleton width={40} height={40} border="50%" />
          <div className="flex flex-col gap-2">
            <Skeleton height={12} width={160} />
            <Skeleton height={10} width={96} />
          </div>
        </div>
        <Skeleton width={24} height={24} border="50%" />
      </div>

      {/* Messages area */}
      <div className="flex-1 min-h-0 bg-white px-6 py-4 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <Skeleton height={40} width={i % 2 === 0 ? 192 : 144} border="16px" />
          </div>
        ))}
      </div>

      {/* MessageInput skeleton */}
      <div className="shrink-0 px-6 py-4 bg-underground-primary flex gap-3">
        <Skeleton height={40} border="9999px" className="flex-1" />
        <Skeleton width={40} height={40} border="50%" />
      </div>

    </div>
  );
});

MessagesLoader.displayName = 'MessagesLoader';
