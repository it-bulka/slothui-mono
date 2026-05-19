import { lazy } from 'react';

export const RightSidebarLazy = lazy(() =>
  import('./RightSidebar').then(m => ({ default: m.RightSidebar }))
);
