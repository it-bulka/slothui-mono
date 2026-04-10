import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const FriendsPageLoader = memo(() => {
  return (
    <div>

      {/* Toolbar skeleton */}
      <div className="border-style-b px-main py-5">
        <div className="w-full h-11 rounded-3xl bg-gray-g4/40 animate-pulse" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-4 px-main py-4 border-style-b">
        <Skeleton className="w-20 h-4 rounded" />
        <Skeleton className="w-24 h-4 rounded" />
      </div>

      {/* List skeleton */}
      <div className="px-main">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 border-style-b"
          >

            {/* Avatar + text */}
            <div className="flex items-center gap-3 grow">
              <Skeleton className="w-10 h-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="w-28 h-3 rounded" />
                <Skeleton className="w-40 h-3 rounded" />
              </div>
            </div>

            {/* Action button placeholder */}
            <Skeleton className="w-16 h-8 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
});

FriendsPageLoader.displayName = 'FriendsPageLoader';