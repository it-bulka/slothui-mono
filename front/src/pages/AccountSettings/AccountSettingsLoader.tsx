import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const AccountSettingsLoader = memo(() => {
  return (
    <div className="min-h-full bg-underground-secondary">

      {/* Header */}
      <div className="px-main py-4 border-style-b flex justify-between items-center">
        <Skeleton className="w-44 h-4 rounded" />
        <Skeleton className="w-32 h-4 rounded" />
      </div>

      <div className="px-main py-main flex flex-col gap-6">

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-4 rounded" />
          <div className="w-full h-11 rounded-2xl bg-gray-g4/30 animate-pulse" />
        </div>

        {/* Change password button */}
        <div className="w-full h-11 rounded-2xl bg-gray-g4/30 animate-pulse" />

        {/* Sessions block */}
        <div className="flex flex-col gap-3">
          <Skeleton className="w-40 h-4 rounded" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between w-full h-11 px-4 rounded-2xl bg-gray-g4/20 animate-pulse"
            >
              <Skeleton className="w-56 h-3 rounded" />
              <Skeleton className="w-6 h-6 rounded" />
            </div>
          ))}
        </div>

        {/* Delete account button */}
        <div className="w-full h-11 rounded-2xl bg-red-100/30 animate-pulse" />

      </div>
    </div>
  );
});

AccountSettingsLoader.displayName = 'AccountSettingsLoader';