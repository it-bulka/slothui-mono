import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const UserLoader = memo(() => {
  return (
    <div>
      <div className="hidden md:flex items-center px-main py-5 border-style-b">
        <Skeleton className="w-36 h-9 rounded-2xl" />
      </div>

      <div className="flex gap-4 px-main py-4 border-style-b">
        <Skeleton className="w-12 h-4 rounded" />
        <Skeleton className="w-14 h-4 rounded" />
      </div>

      <div className="flex flex-col gap-4 px-main py-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-light-l3 shadow">
            <div className="flex items-center gap-3">
              <Skeleton width={50} height={50} border="50%" />
              <div className="flex flex-col gap-2 grow">
                <Skeleton width="40%" height={14} />
                <Skeleton width="30%" height={12} />
              </div>
            </div>
            <Skeleton height={12} width="90%" />
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="70%" />
            <Skeleton height={180} border="16px" />
          </div>
        ))}
      </div>
    </div>
  );
});

UserLoader.displayName = 'UserLoader';
