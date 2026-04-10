import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { UserFriendsLoader } from './UserFriendsLoader.tsx';

const UserFriendsAsync = lazy(() => import('./UserFriends'))
export const UserFriendsPage = withSuspense(UserFriendsAsync, <UserFriendsLoader />)