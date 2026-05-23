import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { PostPageSkeleton } from './PostPageSkeleton';

const PostPageAsync = lazy(() => import('./PostPage.tsx'));
export const PostPage = withSuspense(PostPageAsync, <PostPageSkeleton />);
