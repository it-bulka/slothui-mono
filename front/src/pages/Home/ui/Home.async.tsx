import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { HomeLoader } from './HomeLoader.tsx';

const HomeAsync = lazy(() => import('./Home.tsx'));
export const HomePage = withSuspense(HomeAsync, <HomeLoader />);