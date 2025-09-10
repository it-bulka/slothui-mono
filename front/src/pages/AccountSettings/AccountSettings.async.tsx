import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const AccountSettingsAsync = lazy(() => import("./AccountSettings"))
export const AccountSettingsPage = withSuspense(AccountSettingsAsync);