import { Skeleton } from '@/shared/ui/Skeleton';

export const RightSidebarSkeleton = () => (
  <div className="border-style-l bg-white h-full">
    {/* SidebarHeader: avatar + action icons */}
    <div className="px-6 py-5 flex items-center gap-2">
      <Skeleton width={40} height={40} border="50%" />
      <div className="ml-auto flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} width={32} height={32} border="50%" />
        ))}
      </div>
    </div>

    {/* profile-hero: stats + stories */}
    <div className="mx-4 mb-4 rounded-[var(--radius-lg)] bg-light-l3/50 p-4 flex flex-col gap-3">
      <div className="flex justify-center gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Skeleton width={32} height={18} border="4px" />
            <Skeleton width={56} height={14} border="4px" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} width={56} height={56} border="50%" />
        ))}
      </div>
    </div>

    {/* Info cards */}
    <div className="p-6 flex flex-col gap-8">
      <Skeleton height={60} border="var(--radius-lg)" />
      <Skeleton height={48} border="var(--radius-lg)" />
      <Skeleton height={80} border="var(--radius-lg)" />
    </div>
  </div>
);
