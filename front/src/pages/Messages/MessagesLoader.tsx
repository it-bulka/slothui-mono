import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const MessagesLoader = memo(() => {
  return (
    <div className="h-screen flex flex-col">

      {/* HEADER */}
      <div className="border-style-b px-6 py-4 flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-3 rounded" />
          <Skeleton className="w-24 h-3 rounded" />
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 bg-underground-secondary px-6 py-4 flex flex-col gap-4">

        {/* fake messages */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <Skeleton
                className={`h-10 rounded-2xl ${
                  i % 2 === 0 ? 'w-48' : 'w-36'
                }`}
              />
            </div>
          ))}
        </div>

      </div>

      {/* INPUT */}
      <div className="sticky bottom-0 left-0 px-6 py-4 bg-underground-primary flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

    </div>
  );
});

MessagesLoader.displayName = 'MessagesLoader';