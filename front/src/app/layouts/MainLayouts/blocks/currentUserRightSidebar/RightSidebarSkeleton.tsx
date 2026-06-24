import { Skeleton } from '@/shared/ui/Skeleton';

export const RightSidebarSkeleton = () => (
  <div className="border-style-l bg-white h-full px-6 py-5 flex flex-col gap-4">
    <Skeleton height={40} border="8px" />
    <Skeleton height={72} border="8px" />
    <Skeleton height={120} border="8px" />
    <Skeleton height={120} border="8px" />
  </div>
);
