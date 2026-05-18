import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { MyFeedLoader } from './MyFeedLoader.tsx';

const MeAsync = lazy(() => import("./Me"));
export const MePage = withSuspense(MeAsync, <MyFeedLoader />);