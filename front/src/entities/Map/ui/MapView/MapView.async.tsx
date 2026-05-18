import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';

const MapViewLazy = lazy(() => import('./MapView').then(m => ({ default: m.MapView })));

export const MapView = withSuspense(
  MapViewLazy,
  <div className="h-[400px] w-full animate-pulse rounded-xl bg-gray-100 dark:bg-slate-800" />
);
