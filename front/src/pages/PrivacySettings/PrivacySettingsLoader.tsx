import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const PrivacySettingsLoader = memo(() => {
  return (
    <div className="min-h-full bg-underground-secondary">

      {/* Header skeleton */}
      <div className="px-main py-4 border-style-b flex justify-between items-center">
        <Skeleton className="w-40 h-4 rounded" />
        <Skeleton className="w-32 h-4 rounded" />
      </div>

      {/* Content */}
      <div className="px-main py-main flex flex-col gap-6">

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">

            {/* label */}
            <Skeleton className="w-48 h-4 rounded" />

            {/* dropdown */}
            <div className="w-full h-11 rounded-2xl bg-gray-g4/30 animate-pulse" />
          </div>
        ))}

        {/* button */}
        <div className="flex justify-end mt-2">
          <Skeleton className="w-32 h-10 rounded-2xl" />
        </div>

      </div>
    </div>
  );
});

PrivacySettingsLoader.displayName = 'PrivacySettingsLoader';