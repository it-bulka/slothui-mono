import { Skeleton } from '@/shared/ui/Skeleton';

export const PostPageSkeleton = () => (
  <div className="px-main py-main">
    <div className="rounded-xl border-style-l bg-light-l2 p-5 flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <Skeleton width={44} height={44} border="50%" />
        <div className="flex flex-col gap-2">
          <Skeleton width={140} height={14} border="4px" />
          <Skeleton width={100} height={12} border="4px" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton height={14} border="4px" />
        <Skeleton height={14} border="4px" className="w-[85%]" />
        <Skeleton height={14} border="4px" className="w-[60%]" />
      </div>

      <div className="flex gap-6 pt-1">
        <Skeleton width={60} height={28} border="6px" />
        <Skeleton width={60} height={28} border="6px" />
        <Skeleton width={60} height={28} border="6px" />
        <Skeleton width={60} height={28} border="6px" />
      </div>
    </div>
  </div>
);
