import { lazy } from 'react';

export const UserRightSidebarLazy = lazy(() =>
  import('./UserRightSidebar').then(m => ({ default: m.UserRightSidebar }))
);
