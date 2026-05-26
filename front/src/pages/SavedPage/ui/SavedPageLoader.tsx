import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const SavedPageLoader = memo(() => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="toolbar">
        <Skeleton className="w-16 h-5 rounded" />
      </div>
      <div className="flex gap-4 px-main py-3 border-style-b">
        <Skeleton className="w-16 h-4 rounded" />
        <Skeleton className="w-16 h-4 rounded" />
      </div>
      <div className="bg-white px-main py-main flex flex-col gap-4 grow">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-light-l3 shadow">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="w-40 h-3 rounded" />
              <Skeleton className="w-24 h-3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SavedPageLoader.displayName = 'SavedPageLoader';
