import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const NotificationsPageLoader = memo(() => {
  return (
    <div className="relative flex flex-col min-h-full">
      <div className="toolbar">
        <Skeleton className="w-32 h-5 rounded" />
      </div>
      <div className="px-main py-main flex flex-col gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton className="w-40 h-3 rounded" />
              <Skeleton className="w-28 h-3 rounded" />
            </div>
            <Skeleton className="w-10 h-3 rounded shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
});

NotificationsPageLoader.displayName = 'NotificationsPageLoader';
