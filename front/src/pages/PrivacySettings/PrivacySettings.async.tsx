import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { PrivacySettingsLoader } from './PrivacySettingsLoader.tsx';

const PrivacySettingsAsync = lazy(() => import("./PrivacySettings"))
export const PrivacySettingsPage = withSuspense(PrivacySettingsAsync, <PrivacySettingsLoader />)