import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';

const EventDetailsAsync = lazy(() => import("./EventDetails.tsx"))
export const EventDetailsPage = withSuspense(EventDetailsAsync);