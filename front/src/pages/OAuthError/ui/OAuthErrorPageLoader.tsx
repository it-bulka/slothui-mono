import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';

export const OAuthErrorPageLoader = memo(() => {
  return (
    <div className="md:max-w-1/3 max-w-[80%] min-w-[300px] flex flex-col gap-4 p-10 bg-auth-form mx-auto">
      <Skeleton className="h-7 w-3/4 rounded mx-auto" />
      <Skeleton className="h-5 w-full rounded" />
      <Skeleton className="h-3 w-24 rounded mx-auto mt-2" />
    </div>
  );
});

OAuthErrorPageLoader.displayName = 'OAuthErrorPageLoader';
