import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const PrivacySettingsAsync = lazy(() => import("./PrivacySettings"))
export const PrivacySettingsPage = withSuspense(PrivacySettingsAsync)