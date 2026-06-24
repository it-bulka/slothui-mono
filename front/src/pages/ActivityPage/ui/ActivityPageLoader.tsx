import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ActivityPageLoader = memo(() => {
  return (
    <main className="relative flex flex-col min-h-full">
      <div className="toolbar header-glass sticky top-0 z-10">
        <Skeleton className="w-24 h-5 rounded" />
      </div>
      <div className="px-main py-main bg-underground-secondary flex flex-col gap-4 grow">
        {[1, 2].map(i => (
          <div key={i} className="flex items-center gap-4 p-5 rounded-[var(--radius-lg)] bg-light-l2 border border-gray-g3">
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-48 h-3 rounded" />
            </div>
            <Skeleton className="w-5 h-5 rounded shrink-0" />
          </div>
        ))}
      </div>
    </main>
  );
});

ActivityPageLoader.displayName = 'ActivityPageLoader';
