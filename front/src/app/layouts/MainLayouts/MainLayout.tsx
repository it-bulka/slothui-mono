import { type ReactNode, memo } from 'react';
import { LeftSidebar } from './blocks/LeftSightbar.tsx'
import { Outlet } from 'react-router';
import { ScrollableBlock } from '@/shared/ui';

export const MainLayout = memo(({ rightSidebar }: { rightSidebar: ReactNode}) => {
  return (
    <div className={'grid grid-cols-[minmax(150px,25%)_1fr_minmax(200px,30%)] h-screen'}>
      <LeftSidebar />
      <ScrollableBlock className="min-w-0">
        <Outlet />
      </ScrollableBlock>
      <ScrollableBlock>
        { rightSidebar }
      </ScrollableBlock>
    </div>
  )
})

MainLayout.displayName = 'MainLayout'