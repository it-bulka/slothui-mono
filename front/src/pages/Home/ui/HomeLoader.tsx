import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HomeLoader = memo(() => {
  return (
    <div className="flex flex-col min-h-full">

      {/* PostsToolbar: search + add post button */}
      <div className="toolbar gap-4">
        <Skeleton className="flex-1 h-10 rounded-[1.125rem]" />
        <Skeleton className="w-10 h-10 rounded-[var(--radius-sm)] sm:w-32 shrink-0" />
      </div>

      <div className="bg-light-l2 px-main py-6 grow flex flex-col gap-4">

        {/* Stories */}
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <Skeleton width={56} height={56} border="50%" />
              <Skeleton width={40} height={8} />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <Skeleton width={60} height={16} />
          <Skeleton width={60} height={16} />
        </div>

        {/* Posts */}
        {[1, 2].map(i => (
          <div key={i} className="p-4 rounded-[var(--radius-xl)] bg-light-l3 shadow flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton width={46} height={46} border="50%" />
              <div className="flex flex-col gap-2 grow">
                <Skeleton height={14} width="60%" />
                <Skeleton height={12} width="40%" />
              </div>
            </div>
            <Skeleton height={12} width="90%" />
            <Skeleton height={12} width="75%" />
          </div>
        ))}

      </div>
    </div>
  );
});

HomeLoader.displayName = 'HomeLoader';