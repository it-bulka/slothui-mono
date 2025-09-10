import { type ReactNode, memo } from 'react';
import { LeftSidebar } from './blocks/LeftSightbar.tsx'
import { Outlet } from 'react-router';

export const MainLayout = memo(({ rightSidebar }: { rightSidebar: ReactNode}) => {
  return (
    <div className={'grid grid-cols-[minmax(150px,25%)_1fr_minmax(200px,30%)] min-h-screen'}>
      <LeftSidebar />
      <main className="min-w-0">
        <Outlet />
      </main>
      { rightSidebar }
    </div>
  )
})

MainLayout.displayName = 'MainLayout'