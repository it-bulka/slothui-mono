import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ForgotPasswordPageLoader = memo(() => {
  return (
    <div className="md:max-w-1/3 max-w-[80%] min-w-[300px] flex flex-col gap-4 p-10 bg-auth-form mx-auto">

      {/* Title */}
      <Skeleton className="h-7 w-3/4 rounded mx-auto" />

      {/* Email input */}
      <Skeleton className="h-10 w-full rounded" />

      {/* Submit button */}
      <Skeleton className="h-10 w-full rounded" />

      {/* Links */}
      <div className="flex justify-center gap-6 mt-1">
        <Skeleton className="h-3 w-12 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  );
});

ForgotPasswordPageLoader.displayName = 'ForgotPasswordPageLoader';
