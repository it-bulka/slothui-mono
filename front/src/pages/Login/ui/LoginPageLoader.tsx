import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const LoginPageLoader = memo(() => {
  return (
    <div className="md:max-w-1/3 max-w-[80%] min-w-[300px] flex flex-col gap-4 p-10 bg-auth-form mx-auto">

      {/* Title */}
      <Skeleton className="h-7 w-3/4 rounded mx-auto" />

      {/* Email input */}
      <Skeleton className="h-10 w-full rounded" />

      {/* Password input */}
      <Skeleton className="h-10 w-full rounded" />

      {/* Submit button */}
      <Skeleton className="h-10 w-full rounded" />

      {/* OAuth divider */}
      <Skeleton className="h-4 w-36 rounded mx-auto my-2" />

      {/* OAuth buttons */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-full" />
        ))}
      </div>

      {/* Links */}
      <div className="flex justify-center gap-6 mt-1">
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </div>
  );
});

LoginPageLoader.displayName = 'LoginPageLoader';
