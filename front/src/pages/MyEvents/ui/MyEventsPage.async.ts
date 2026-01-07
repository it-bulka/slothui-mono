import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const MyEventsAsync = lazy(() => import("./MyEvents.tsx"));
export const MyEventsPage = withSuspense(MyEventsAsync);