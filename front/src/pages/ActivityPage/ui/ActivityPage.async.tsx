import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { ActivityPageLoader } from './ActivityPageLoader';

const ActivityPageAsync = lazy(() => import('./ActivityPage'));
export const ActivityPage = withSuspense(ActivityPageAsync, <ActivityPageLoader />);
