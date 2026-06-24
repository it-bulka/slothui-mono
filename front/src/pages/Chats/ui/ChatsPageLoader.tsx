import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ChatsPageLoader = memo(() => {
  return (
    <>
      {/* Search input */}
      <div className="px-main py-main">
        <div className="w-full h-10 rounded-[1.125rem] bg-gray-g4/40 animate-pulse" />
      </div>

      {/* Chats list */}
      <div className="px-main border-style-t">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-[0.9375rem] border-style-b"
          >
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div className="grow space-y-2">
              <Skeleton className="w-1/3 h-3.5 rounded" />
              <Skeleton className="w-2/3 h-3 rounded" />
            </div>
            <Skeleton className="w-5 h-5 rounded shrink-0" />
          </div>
        ))}
      </div>
    </>
  );
});

ChatsPageLoader.displayName = 'ChatsPageLoader';