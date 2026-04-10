import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { AccountSettingsLoader } from './AccountSettingsLoader.tsx';

const AccountSettingsAsync = lazy(() => import("./AccountSettings"))
export const AccountSettingsPage = withSuspense(AccountSettingsAsync, <AccountSettingsLoader />);