import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { SettingsLoader } from './SettingsLoader.tsx';

const SettingsAsync = lazy(() => import("./Settings"))
export const SettingsPage = withSuspense(SettingsAsync, <SettingsLoader />);