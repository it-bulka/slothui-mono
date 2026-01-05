import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const UserAsync = lazy(() => import("./User.tsx"))
export const UserPage = withSuspense(UserAsync);