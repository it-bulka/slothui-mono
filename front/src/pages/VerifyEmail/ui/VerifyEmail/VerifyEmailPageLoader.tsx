import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const VerifyEmailPageLoader = memo(() => {
  return (
    <div className="md:max-w-1/3 max-w-[80%] min-w-[300px] flex flex-col gap-2 px-4 py-10 md:p-10 bg-auth-form mx-auto">
      <Skeleton className="h-7 w-2/3 rounded mx-auto" />
    </div>
  );
});

VerifyEmailPageLoader.displayName = 'VerifyEmailPageLoader';
