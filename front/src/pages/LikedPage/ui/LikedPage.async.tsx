import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { LikedPageLoader } from './LikedPageLoader';

const LikedPageAsync = lazy(() => import('./LikedPage'));
export const LikedPage = withSuspense(LikedPageAsync, <LikedPageLoader />);
