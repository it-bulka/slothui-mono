import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const NotificationsPageLoader = memo(() => {
  return (
    <div className="px-main py-main flex flex-col gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl bg-gray-g4/20 animate-pulse"
        >
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="w-48 h-3 rounded" />
            <Skeleton className="w-32 h-3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
});

NotificationsPageLoader.displayName = 'NotificationsPageLoader';
