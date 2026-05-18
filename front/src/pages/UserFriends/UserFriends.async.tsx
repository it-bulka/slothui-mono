import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { UserFriendsLoader } from './UserFriendsLoader.tsx';

const UserFriendsAsync = lazy(() => import('./UserFriends'))
export const UserFriendsPage = withSuspense(UserFriendsAsync, <UserFriendsLoader />)