import { Skeleton } from '@/shared/ui/Skeleton';
import { memo } from 'react';

export const EventsLoader = memo(() => {
  return (
    <div className="flex flex-col gap-4 px-main py-6">

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-light-l3 shadow flex flex-col gap-3"
        >
          {/* Title row */}
          <div className="flex items-center gap-3">
            <Skeleton width={50} height={50} border="12px" />
            <div className="flex flex-col gap-2 grow">
              <Skeleton width="60%" height={16} />
              <Skeleton width="40%" height={14} />
            </div>
          </div>

          {/* description rows */}
          <Skeleton height={12} width="90%" />
          <Skeleton height={12} width="75%" />

          {/* optional image */}
          <Skeleton height={140} border="16px" />
        </div>
      ))}

    </div>
  );
});

EventsLoader.displayName = 'EventsLoader';