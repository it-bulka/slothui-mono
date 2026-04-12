import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const LikedPageLoader = memo(() => {
  return (
    <div className="px-main py-main flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-4 rounded-xl bg-gray-g4/20 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="w-40 h-3 rounded" />
              <Skeleton className="w-24 h-3 rounded" />
            </div>
          </div>
          <Skeleton className="w-full h-32 rounded-xl" />
        </div>
      ))}
    </div>
  );
});

LikedPageLoader.displayName = 'LikedPageLoader';
