import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { UserLoader } from './UserLoader.tsx';

const UserAsync = lazy(() => import("./User.tsx"))
export const UserPage = withSuspense(UserAsync, <UserLoader />);