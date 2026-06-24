import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const UserRightSidebarLoader = memo(() => {
  return (
    <aside className="px-sidebar py-sidebar border-style-l bg-underground-secondary">
      {/* SidebarHeader: avatar + action icons */}
      <div className="px-6 py-5 flex items-center gap-2">
        <Skeleton width={40} height={40} border="50%" />
        <div className="ml-auto flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} width={32} height={32} border="50%" />
          ))}
        </div>
      </div>

      {/* profile-hero: avatar + name + stats + actions + stories */}
      <div className="mb-4 p-4 rounded-[var(--radius-lg)] bg-light-l3/50 flex flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <Skeleton width={64} height={64} border="50%" />
          <Skeleton width="50%" height={14} />
          <Skeleton width="35%" height={12} />
        </div>

        <div className="flex justify-center gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton width={32} height={18} border="4px" />
              <Skeleton width={56} height={14} border="4px" />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Skeleton className="flex-1 h-9 rounded-[var(--radius-sm)]" />
          <Skeleton className="flex-1 h-9 rounded-[var(--radius-sm)]" />
        </div>

        <div className="flex justify-center gap-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} width={56} height={56} border="50%" />
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-20 rounded-[var(--radius-lg)]" />
        <Skeleton className="w-full h-16 rounded-[var(--radius-lg)]" />
      </div>
    </aside>
  );
});

UserRightSidebarLoader.displayName = 'UserRightSidebarLoader';
