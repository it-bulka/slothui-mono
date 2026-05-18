import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';

const PostPageAsync = lazy(() => import('./PostPage.tsx'));
export const PostPage = withSuspense(PostPageAsync);
