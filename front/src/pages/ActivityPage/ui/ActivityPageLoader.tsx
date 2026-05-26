import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ActivityPageLoader = memo(() => {
  return (
    <div className="relative flex flex-col min-h-full">
      <div className="toolbar">
        <Skeleton className="w-24 h-5 rounded" />
      </div>
      <div className="px-main py-main flex flex-col gap-3">
        <Skeleton className="w-16 h-4 rounded" />
        <Skeleton className="w-14 h-4 rounded" />
      </div>
    </div>
  );
});

ActivityPageLoader.displayName = 'ActivityPageLoader';
