import { type ReactNode, memo } from 'react';
import { LeftSidebar } from './blocks/LeftSightbar.tsx'
import { Outlet } from 'react-router';
import { ScrollableBlock, InlineErrorBoundary } from '@/shared/ui';

export const MainLayout = memo(({ rightSidebar }: { rightSidebar: ReactNode}) => {
  return (
    <div className={'grid grid-cols-[minmax(150px,25%)_1fr_minmax(200px,30%)] h-screen bg-light-l3'}>
      <LeftSidebar />
      <ScrollableBlock className="min-w-0">
        <InlineErrorBoundary>
          <Outlet />
        </InlineErrorBoundary>
      </ScrollableBlock>
      <ScrollableBlock>
        { rightSidebar }
      </ScrollableBlock>
    </div>
  )
})

MainLayout.displayName = 'MainLayout'