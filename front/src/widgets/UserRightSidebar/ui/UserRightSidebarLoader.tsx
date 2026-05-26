import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const UserRightSidebarLoader = memo(() => {
  return (
    <aside className="px-sidebar py-sidebar border-style-l bg-underground-secondary">

      {/* Avatar + name + nickname */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <Skeleton width={64} height={64} border="50%" />
        <Skeleton width="50%" height={14} />
        <Skeleton width="35%" height={12} />
      </div>

      {/* Statistics */}
      <div className="flex justify-between mb-4">
        {[1, 2, 3].map(i => <Skeleton key={i} width="28%" height={32} border="8px" />)}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="flex-1 h-9 rounded-3xl" />
        <Skeleton className="flex-1 h-9 rounded-3xl" />
      </div>

      {/* Info cards */}
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-20 rounded-xl" />
        <Skeleton className="w-full h-16 rounded-xl" />
      </div>

    </aside>
  );
});

UserRightSidebarLoader.displayName = 'UserRightSidebarLoader';
