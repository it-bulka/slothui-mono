import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const SettingsLoader = memo(() => {
  return (
    <div className="px-main py-main bg-underground-secondary min-h-full flex flex-col gap-3">

      {/* Theme select skeleton */}
      <div className="space-y-2">
        <Skeleton className="w-20 h-4 rounded" />

        <div className="w-full h-11 rounded-2xl bg-gray-g4/40 animate-pulse" />
      </div>

      {/* Links skeleton */}
      <div className="flex flex-col gap-3 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-full h-11 px-4 rounded-2xl bg-gray-g4/20 animate-pulse"
          >
            <Skeleton className="w-40 h-3 rounded" />
            <Skeleton className="w-5 h-5 rounded" />
          </div>
        ))}
      </div>

    </div>
  );
});

SettingsLoader.displayName = 'SettingsLoader';