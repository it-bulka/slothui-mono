import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { SavedPageLoader } from './SavedPageLoader';

const SavedPageAsync = lazy(() => import('./SavedPage'));
export const SavedPage = withSuspense(SavedPageAsync, <SavedPageLoader />);
