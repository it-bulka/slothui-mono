import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { UserLoader } from './UserLoader.tsx';

const UserAsync = lazy(() => import("./User.tsx"))
export const UserPage = withSuspense(UserAsync, <UserLoader />);