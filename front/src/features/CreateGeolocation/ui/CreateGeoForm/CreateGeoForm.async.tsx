import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const CreateGeoFormAsync = lazy(() => import('./CreateGeoForm.tsx'))
export const CreateGeoFormLazy = withSuspense(CreateGeoFormAsync);