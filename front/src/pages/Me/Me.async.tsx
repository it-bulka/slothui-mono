import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const MeAsync = lazy(() => import("./Me"));
export const MePage = withSuspense(MeAsync);