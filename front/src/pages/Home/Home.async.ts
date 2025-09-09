import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const HomeAsync = lazy(() => import('./Home'));
export const HomePage = withSuspense(HomeAsync);