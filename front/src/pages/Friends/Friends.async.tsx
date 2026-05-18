import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { FriendsPageLoader } from './FriendsPageLoader.tsx';

const FriendsAsync = lazy(() => import("./Friends"))
export const FriendsPage = withSuspense(FriendsAsync, <FriendsPageLoader />);