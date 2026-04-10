import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { EventsLoader } from './EventsLoader.tsx';

const MyEventsAsync = lazy(() => import("./MyEvents.tsx"));
export const MyEventsPage = withSuspense(MyEventsAsync, <EventsLoader />);