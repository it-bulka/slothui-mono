import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const HomeAsync = lazy(() => import('./Home.tsx'));
export const HomePage = withSuspense(HomeAsync);