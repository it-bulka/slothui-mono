import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const ProfileSettingsAsync = lazy(() => import("./ProfileSettings"))
export const ProfileSettingsPage = withSuspense(ProfileSettingsAsync);