import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { UserLoader } from './UserLoader';

const UserLayoutAsync = lazy(() => import('./UserLayout'));
export const UserLayoutLazy = withSuspense(UserLayoutAsync, <UserLoader />);
