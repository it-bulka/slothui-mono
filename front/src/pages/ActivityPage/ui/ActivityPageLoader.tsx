import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const ActivityPageLoader = memo(() => {
  return (
    <div className="px-main py-main flex flex-col gap-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl bg-gray-g4/20 animate-pulse"
        >
          <Skeleton className="w-5 h-5 rounded shrink-0" />
          <Skeleton className="w-32 h-4 rounded" />
        </div>
      ))}
    </div>
  );
});

ActivityPageLoader.displayName = 'ActivityPageLoader';
