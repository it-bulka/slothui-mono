import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const SettingsLoader = memo(() => {
  return (
    <div className="px-main py-main bg-underground-secondary min-h-full flex flex-col gap-4">

      {/* Theme select skeleton */}
      <div className="p-4 rounded-[var(--radius-lg)] bg-light-l2 border border-gray-g3">
        <Skeleton className="w-20 h-4 rounded mb-3" />
        <div className="flex gap-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="flex-1 h-16 rounded-[var(--radius-md)]" />
          ))}
        </div>
      </div>

      {/* NavCardLink skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-5 rounded-[var(--radius-lg)] bg-light-l2 border border-gray-g3"
        >
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="w-32 h-4 rounded" />
            <Skeleton className="w-48 h-3 rounded" />
          </div>
          <Skeleton className="w-5 h-5 rounded shrink-0" />
        </div>
      ))}

    </div>
  );
});

SettingsLoader.displayName = 'SettingsLoader';