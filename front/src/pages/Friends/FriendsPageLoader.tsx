import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const FriendsPageLoader = memo(() => {
  return (
    <div>
      {/* ToolbarWrapper: search bar */}
      <div className="border-style-b px-main py-5 relative">
        <div className="w-full h-11 rounded-[1.125rem] bg-gray-g4/40 animate-pulse" />
      </div>

      {/* Tab nav: two stretch buttons */}
      <div className="relative flex">
        <div className="grow px-6 py-5 border-style-b flex justify-center">
          <Skeleton className="w-20 h-4 rounded" />
        </div>
        <div className="grow px-6 py-5 border-style-b flex justify-center">
          <Skeleton className="w-24 h-4 rounded" />
        </div>
      </div>

      {/* Friends list */}
      <div className="px-main">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-[0.9375rem] border-style-b gap-2 px-2"
          >
            <div className="flex items-center gap-3 grow">
              <Skeleton className="w-12 h-12 rounded-full shrink-0" />
              <div className="space-y-2">
                <Skeleton className="w-28 h-3.5 rounded" />
                <Skeleton className="w-36 h-3 rounded" />
              </div>
            </div>
            <Skeleton className="w-20 h-9 rounded-[var(--radius-sm)]" />
          </div>
        ))}
      </div>
    </div>
  );
});

FriendsPageLoader.displayName = 'FriendsPageLoader';