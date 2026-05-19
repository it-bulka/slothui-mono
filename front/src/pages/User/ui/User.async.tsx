import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { UserLoader } from '@/app/layouts/UserLayout/UserLoader';

const UserAsync = lazy(() => import("./User.tsx"))
export const UserPage = withSuspense(UserAsync, <UserLoader />);