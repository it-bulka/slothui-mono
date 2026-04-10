import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const UserFriendsLoader = memo(() => {
  return (
    <div>

      {/* Tabs skeleton (followers / followings) */}
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

            {/* avatar + info */}
            <div className="flex items-center gap-3 grow">
              <Skeleton className="w-10 h-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="w-28 h-3 rounded" />
                <Skeleton className="w-40 h-3 rounded" />
              </div>
            </div>

            {/* action button */}
            <Skeleton className="w-16 h-8 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
});

UserFriendsLoader.displayName = 'UserFriendsLoader';