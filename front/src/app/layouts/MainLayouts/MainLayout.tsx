import { type ReactNode, memo, useState, useMemo } from 'react';
import { LeftSidebar, LeftSidebarContent } from './blocks/LeftSightbar.tsx';
import { MobileHeader } from './blocks/MobileHeader.tsx';
import { Outlet } from 'react-router';
import { ScrollableBlock, InlineErrorBoundary, SideDrawer, Drawer } from '@/shared/ui';
import { SidebarContext, type SidebarState } from './SidebarContext.ts';

interface MainLayoutProps {
  rightSidebar: ReactNode;
  mobileRightSidebar?: ReactNode;
}

export const MainLayout = memo(({ rightSidebar, mobileRightSidebar }: MainLayoutProps) => {
  const [sidebar, setSidebar] = useState<SidebarState>('none');

  const ctx = useMemo(() => ({
    sidebar,
    openLeft:  () => setSidebar('left'),
    openRight: () => setSidebar('right'),
    close:     () => setSidebar('none'),
  }), [sidebar]);

  return (
    <SidebarContext.Provider value={ctx}>
      <div className="flex flex-col h-dvh md:contents">
        {/* Mobile-only header */}
        <MobileHeader className="shrink-0 sticky top-0 z-30 md:hidden" />

        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[72px_1fr_minmax(270px,35%)] xl:grid-cols-[minmax(150px,20%)_1fr_minmax(260px,28%)] md:h-screen bg-light-l3">
          {/* Left sidebar — visible on md+ as inline column */}
          <div className="hidden md:block">
            <LeftSidebar />
          </div>

          {/* Main feed */}
          <ScrollableBlock className="min-w-0">
            <main>
              <InlineErrorBoundary>
                <Outlet />
              </InlineErrorBoundary>
            </main>
          </ScrollableBlock>

          {/* Right sidebar — visible on md+ (tablet + desktop) */}
          <ScrollableBlock className="hidden md:block">
            {rightSidebar}
          </ScrollableBlock>
        </div>
      </div>

      {/* Mobile left side drawer */}
      <SideDrawer
        isOpen={sidebar === 'left'}
        onClose={ctx.close}
        className="md:hidden"
      >
        <LeftSidebarContent />
      </SideDrawer>

      {/* Mobile right bottom sheet — only renders if mobileRightSidebar provided */}
      {mobileRightSidebar && (
        <Drawer isOpen={sidebar === 'right'} onClose={ctx.close}>
          {mobileRightSidebar}
        </Drawer>
      )}
    </SidebarContext.Provider>
  );
});

MainLayout.displayName = 'MainLayout';
