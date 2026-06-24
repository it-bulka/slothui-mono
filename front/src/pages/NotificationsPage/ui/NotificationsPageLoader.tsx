import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

const NotificationSkeleton = ({ hasPreview }: { hasPreview?: boolean }) => (
  <div className="p-3 rounded-xl">
    <div className="flex items-start gap-3">
      <Skeleton className="w-6 h-6 rounded-full shrink-0" />
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton className="w-32 h-3.5 rounded" />
        <Skeleton className="w-40 h-3 rounded" />
      </div>
      <Skeleton className="w-10 h-3 rounded shrink-0" />
    </div>
    {hasPreview && (
      <div className="mt-2 rounded-b-[var(--radius-md)] border border-gray-g3 border-t-0 px-3 pt-2.5 pb-3">
        <Skeleton className="w-full h-3 rounded" />
        <Skeleton className="w-20 h-3 rounded mt-2" />
      </div>
    )}
  </div>
);

export const NotificationsPageLoader = memo(() => (
  <div className="relative flex flex-col min-h-full">
    <div className="toolbar sticky top-0 z-10">
      <Skeleton className="w-32 h-5 rounded" />
    </div>
    <div className="px-main py-main flex flex-col gap-1 flex-1">
      <NotificationSkeleton hasPreview />
      <NotificationSkeleton />
      <NotificationSkeleton hasPreview />
      <NotificationSkeleton />
      <NotificationSkeleton />
    </div>
  </div>
));

NotificationsPageLoader.displayName = 'NotificationsPageLoader';
