import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ChatsPageLoader = memo(() => {
  return (
    <div className="px-main py-main space-y-4">

      {/* Search input */}
      <div className="w-full h-10 rounded-3xl bg-gray-g4/40 animate-pulse" />

      {/* Chats list */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl shadow-theme bg-white"
          >
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div className="grow space-y-2">
              <Skeleton className="w-1/2 h-3 rounded" />
              <Skeleton className="w-2/3 h-3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ChatsPageLoader.displayName = 'ChatsPageLoader';