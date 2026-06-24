import { Skeleton } from '@/shared/ui/Skeleton';
import { memo } from 'react';

export const EventsLoader = memo(() => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="toolbar">
        <Skeleton className="w-40 h-9 rounded-[var(--radius-sm)]" />
        <Skeleton className="w-28 h-5 rounded ml-auto" />
      </div>
      <div className="bg-light-l2 px-main py-6 grow flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-[var(--radius-xl)] bg-light-l3 shadow flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton width={46} height={46} border="12px" />
              <div className="flex flex-col gap-2 grow">
                <Skeleton width="55%" height={14} />
                <Skeleton width="35%" height={12} />
              </div>
            </div>
            <Skeleton height={12} width="85%" />
            <Skeleton height={12} width="65%" />
          </div>
        ))}
      </div>
    </div>
  );
});

EventsLoader.displayName = 'EventsLoader';