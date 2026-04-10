import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const ProfileSettingsLoader = memo(() => {
  return (
    <div className="min-h-full bg-underground-secondary">

      {/* Header */}
      <div className="px-main py-4 border-style-b flex justify-between items-center">
        <Skeleton className="w-44 h-4 rounded" />
        <Skeleton className="w-32 h-4 rounded" />
      </div>

      {/* Form */}
      <div className="px-main py-main flex flex-col gap-5">

        {/* Avatar */}
        <div className="flex justify-center">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>

        {/* Inputs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-32 h-4 rounded" />
            <div className="w-full h-11 rounded-2xl bg-gray-g4/30 animate-pulse" />
          </div>
        ))}

        {/* Email readonly */}
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-4 rounded" />
          <div className="w-full h-11 rounded-2xl bg-gray-g4/20 animate-pulse" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full mt-2">
          <div className="grow h-11 rounded-2xl bg-gray-g4/30 animate-pulse" />
          <div className="grow h-11 rounded-2xl bg-gray-g4/30 animate-pulse" />
        </div>

      </div>
    </div>
  );
});

ProfileSettingsLoader.displayName = 'ProfileSettingsLoader';