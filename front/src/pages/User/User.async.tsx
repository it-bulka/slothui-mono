import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const UserAsync = lazy(() => import("./User"))
export const UserPage = withSuspense(UserAsync);