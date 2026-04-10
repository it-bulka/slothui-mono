import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { ProfileSettingsLoader } from './ProfileSettingsLoader.tsx';

const ProfileSettingsAsync = lazy(() => import("./ProfileSettings"))
export const ProfileSettingsPage = withSuspense(ProfileSettingsAsync, <ProfileSettingsLoader />);