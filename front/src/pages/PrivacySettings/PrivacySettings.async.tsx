import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { PrivacySettingsLoader } from './PrivacySettingsLoader.tsx';

const PrivacySettingsAsync = lazy(() => import("./PrivacySettings"))
export const PrivacySettingsPage = withSuspense(PrivacySettingsAsync, <PrivacySettingsLoader />)