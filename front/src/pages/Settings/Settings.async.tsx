import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const SettingsAsync = lazy(() => import("./Settings"))
export const SettingsPage = withSuspense(SettingsAsync);