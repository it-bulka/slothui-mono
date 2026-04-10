import { Skeleton } from '@/shared/ui/Skeleton';
import { memo } from 'react';

export const MyFeedLoader = memo(() => {
  return (
    <div className="flex flex-col gap-4 px-main py-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-light-l3 shadow"
        >
          {/* header: avatar + name */}
          <div className="flex items-center gap-3">
            <Skeleton width={50} height={50} border="50%" />
            <div className="flex flex-col gap-2 grow">
              <Skeleton width="40%" height={14} />
              <Skeleton width="30%" height={12} />
            </div>
          </div>

          {/* text */}
          <Skeleton height={12} width="90%" />
          <Skeleton height={12} width="80%" />
          <Skeleton height={12} width="70%" />

          {/* image placeholder */}
          <Skeleton height={180} border="16px" />
        </div>
      ))}
    </div>
  );
});

MyFeedLoader.displayName = 'MyFeedLoader';