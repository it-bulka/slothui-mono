import { Skeleton } from '@/shared/ui/Skeleton';
import { memo } from 'react';

export const MyFeedLoader = memo(() => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="toolbar justify-between">
        <Skeleton className="w-32 h-9 rounded-2xl" />
        <Skeleton className="w-24 h-4 rounded" />
      </div>
      <div className="bg-white px-main py-6 grow flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-light-l3 shadow">
            <div className="flex items-center gap-3">
              <Skeleton width={46} height={46} border="50%" />
              <div className="flex flex-col gap-2 grow">
                <Skeleton width="40%" height={14} />
                <Skeleton width="30%" height={12} />
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

MyFeedLoader.displayName = 'MyFeedLoader';