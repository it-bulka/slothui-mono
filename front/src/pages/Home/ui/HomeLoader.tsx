import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HomeLoader = memo(() => {
  return (
    <div className="flex flex-col gap-6 px-main py-6">

      {/* Stories skeleton */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton width={56} height={56} border="50%" />
            <Skeleton width={40} height={10} />
          </div>
        ))}
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-4">
        <Skeleton width={70} height={20} />
        <Skeleton width={70} height={20} />
      </div>

      {/* Posts skeleton */}
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-light-l3 shadow flex flex-col gap-3"
        >
          {/* Header row */}
          <div className="flex items-center gap-3">
            <Skeleton width={46} height={46} border="50%" />
            <div className="flex flex-col gap-2 grow">
              <Skeleton height={14} width="60%" />
              <Skeleton height={12} width="40%" />
            </div>
          </div>

          {/* text */}
          <Skeleton height={12} width="95%" />
          <Skeleton height={12} width="80%" />

          {/* optional media */}
          <Skeleton height={150} border="16px" />
        </div>
      ))}

    </div>
  );
});

HomeLoader.displayName = 'HomeLoader';