import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { MyFeedLoader } from './MyFeedLoader.tsx';

const MeAsync = lazy(() => import("./Me"));
export const MePage = withSuspense(MeAsync, <MyFeedLoader />);